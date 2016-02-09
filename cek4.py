import sys
import StringIO
import contextlib

@contextlib.contextmanager
def stdoutIO(stdout=None):
    old = sys.stdout
    if stdout is None:
        stdout = StringIO.StringIO()
    sys.stdout = stdout
    yield stdout
    sys.stdout = old

with stdoutIO() as s:
    execfile("/home/blank/tugasOS/cek3.py")

print "outs:", s.getvalue()
