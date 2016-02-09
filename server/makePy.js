makePy = function(port){
	var template = '\n\
import zerorpc\n\
import rpy2.robjects as robjects\n\
import sys\n\
import StringIO\n\
import contextlib\n\
\n\
r = robjects.r\n\
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
			execfile(path)\n\
		return s.getvalue()\n\
\n\
	def rcom(self, path):\n\
		with stdoutIO() as s:\n\
			out = r.source(path)\n\
		return s.getvalue()\n\
\n\
s = zerorpc.Server(HelloRPC())\n\
s.bind("tcp://0.0.0.0:'+port+'")\n\
s.run()\n\
';
	Meteor.call('writefiletoPath', PATH+'/user/'+port+'.py',template);
}