makePy = function(port){
	var template = '\n\
import zerorpc\n\
import rpy2.robjects as robjects\n\
import sys\n\
import StringIO\n\
import contextlib\n\
\n\
R_ENV = robjects.r\n\
\n\
import resource\n\
\n\
rsrc = resource.RLIMIT_DATA\n\
stack = resource.RLIMIT_STACK\n\
\n\
softData, hardData = resource.getrlimit(rsrc)\n\
softStack, hardStack = resource.getrlimit(stack)\n\
resource.setrlimit(rsrc, (3388608, hardData))\n\
resource.setrlimit(stack, (16388608, hardStack))\n\
\n\
\n\
@contextlib.contextmanager\n\
def stdoutIO(stdout=None):\n\
	old = sys.stdout\n\
	if stdout is None:\n\
		stdout = StringIO.StringIO()\n\
	sys.stdout = stdout\n\
	yield stdout\n\
	sys.stdout = old\n\
\n\
class HelloRPC(object):\n\
	def pycom(self, path):\n\
		with stdoutIO() as s:\n\
			try:\n\
				execfile(path)\n\
			except Exception,e:\n\
				print e\n\
		return s.getvalue()\n\
\n\
	def rcom(self, path):\n\
		with stdoutIO() as s:\n\
			try:\n\
				R_ENV.source(path)\n\
			except Exception,e:\n\
				print e\n\
		return s.getvalue()\n\
\n\
s = zerorpc.Server(HelloRPC())\n\
s.bind("tcp://0.0.0.0:'+port+'")\n\
s.run()\n\
';
	Meteor.call('writefiletoPath', PATH+'/user/'+port+'.py',template);
}