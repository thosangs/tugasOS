
import zerorpc
import rpy2.robjects as robjects
import sys
import StringIO
import contextlib

R_ENV = robjects.r

import resource

rsrc = resource.RLIMIT_DATA
stack = resource.RLIMIT_STACK

softData, hardData = resource.getrlimit(rsrc)
softStack, hardStack = resource.getrlimit(stack)
resource.setrlimit(rsrc, (2000000000, hardData))
resource.setrlimit(stack, (3000000000, hardStack))


@contextlib.contextmanager
def stdoutIO(stdout=None):
	old = sys.stdout
	if stdout is None:
		stdout = StringIO.StringIO()
	sys.stdout = stdout
	yield stdout
	sys.stdout = old

class HelloRPC(object):
	def pycom(self, path):
		try:
			with stdoutIO() as s:
				execfile(path)
			return s.getvalue()
		except Exception,e:
			return e

	def rcom(self, path):
		try:
			with stdoutIO() as s:
				out = R_ENV.source(path)
			return s.getvalue()
		except Exception,e:
			return e

s = zerorpc.Server(HelloRPC())
s.bind("tcp://0.0.0.0:4230")
s.run()
