import zerorpc
import rpy2.robjects as robjects

class HelloRPC(object):
    def hello(self, name):
    	r = robjects.r
    	d = r.source("/home/blank/tugasOS/cek2.R")
    	f = r['f']
        return "HelloD, %s %s" % (name ,d[0])

s = zerorpc.Server(HelloRPC())
s.bind("tcp://0.0.0.0:4242")
s.run()
