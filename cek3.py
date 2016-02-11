import rpy2.robjects as robjects

R_ENV = robjects.r
try:
	R_ENV.source("cek2.R")
except Exception,e: 
	print "BOOM"
	print e
