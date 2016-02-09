import rpy2.robjects as robjects

r = robjects.r
path = "/home/blank/tugasOS/user/J7XbPJ4s3ad52tpGc.R"
out = r.source(path)
print out[0]
