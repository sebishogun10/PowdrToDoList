# Stage 1: Build
FROM maven:3.9.4-eclipse-temurin-21 AS build

WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:21-jre

WORKDIR /app

# Install curl
RUN apt-get update && apt-get install -y curl

# Copy the application JAR file from the build stage
COPY --from=build /app/target/todo-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Set the entry point
ENTRYPOINT ["java", "-jar", "app.jar"]
