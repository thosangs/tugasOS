import resource

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

print "BOOMA\n"