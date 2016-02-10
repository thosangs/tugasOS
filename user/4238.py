
import zerorpc
import rpy2.robjects as robjects
import sys
import StringIO
import contextlib

r = robjects.r

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
		with stdoutIO() as s:
			execfile(path)
		return s.getvalue()

	def rcom(self, path):
		with stdoutIO() as s:
			out = r.source(path)
		return s.getvalue()

s = zerorpc.Server(HelloRPC())
s.bind("tcp://0.0.0.0:4238")
s.run()
