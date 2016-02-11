from rpy2.robjects import FloatVector
from rpy2.robjects.packages import importr

stats = importr('stats')
base = importr('base')

ctl = FloatVector([4.17,5.58,5.18,6.11,4.50,4.61,5.17,4.53,5.33,5.14])
trt = FloatVector([4.81,4.17,4.41,3.59,5.87,3.83,6.03,4.89,4.32,4.69])
group = base.gl(2, 10, 20, labels = ["Ctl","Trt"])

weight = ctl + trt

robjects.globalenv["weight"] = weight
robjects.globalenv["group"] = group

lm_D9 = stats.lm("weight ~ group")
print(stats.anova(lm_D9))

#menghilangkan intersep
lm_D90 = stats.lm("weight ~ group - 1")
print(base.summary(lm_D90))