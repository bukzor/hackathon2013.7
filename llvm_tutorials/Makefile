ALL=chapter2 chapter3
LLVM=~/bin/llvm/bin/llvm-config

all: $(ALL)

clean:
	rm -f $(ALL)
	
% : %.cpp
	clang++ -g -O3 $< `$(LLVM) --cppflags --libs core` `$(LLVM) --ldflags` -o $@

.PHONY: clean all
