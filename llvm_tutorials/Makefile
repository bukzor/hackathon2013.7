ALL=chapter2 chapter3

all: $(ALL)

clean:
	rm -f $(ALL)
	
% : %.cpp
	clang++ -g -O3 $< `llvm-config-3.0 --cppflags --libs core` `llvm-config-3.0 --ldflags` -o $@

.PHONY: clean all
