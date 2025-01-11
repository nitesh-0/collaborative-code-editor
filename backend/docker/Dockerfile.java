# Dockerfile.java
FROM openjdk:11

# Set the working directory
WORKDIR /app

# Copy source files and compile
COPY . /app
RUN javac MyApp.java

# Command to run the app
CMD ["java", "MyApp"]
