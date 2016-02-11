import zerorpc
import rpy2.robjects as robjects
import sys
import StringIO
import contextlib

RENV = robjects.r

import resource

# for name, desc in [
#     ('RLIMIT_CORE', 'core file size'),
#     ('RLIMIT_CPU',  'CPU time'),
#     ('RLIMIT_FSIZE', 'file size'),
#     ('RLIMIT_DATA', 'heap size'),
#     ('RLIMIT_STACK', 'stack size')
#     ]:
#     limit_num = getattr(resource, name)
#     soft, hard = resource.getrlimit(limit_num)
#     print 'Maximum %-25s (%-15s) : %20s %20s' % (desc, name, soft, hard)

print "BOOM\n"

rsrc = resource.RLIMIT_DATA
stack = resource.RLIMIT_STACK
softData, hardData = resource.getrlimit(rsrc)
softStack, hardStack = resource.getrlimit(stack)
resource.setrlimit(rsrc, (2048000000, hardData))
resource.setrlimit(stack, (306000000, hardStack))

for name, desc in [
    ('RLIMIT_CORE', 'core file size'),
    ('RLIMIT_CPU',  'CPU time'),
    ('RLIMIT_FSIZE', 'file size'),
    ('RLIMIT_DATA', 'heap size'),
    ('RLIMIT_STACK', 'stack size')
    ]:
    limit_num = getattr(resource, name)
    soft, hard = resource.getrlimit(limit_num)
    print 'Maximum %-25s (%-15s) : %20s %20s' % (desc, name, soft, hard)

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
			r.source(path)
		return s.getvalue()

s = zerorpc.Server(HelloRPC())
s.bind("tcp://0.0.0.0:4242")
s.run()