import numpy
# Create visual graphic of the 50 random numbers produced
import matplotlib.pyplot as plot
# Import the pyplot package from the matplotlib library

rand_num = numpy.random.randint(1,101, 50)

# This is "magic" to make the graph show directly in the notebook!

# Create "bins" to organize your numbers on the x-axis
bins = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
plot.hist(rand_num, bins)
plot.title("Random Numbers")
plot.show()