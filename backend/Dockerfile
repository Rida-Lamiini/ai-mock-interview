# ---------- Build stage ----------
FROM eclipse-temurin:21-jdk-jammy AS build

WORKDIR /app

# Copy only the files needed for Maven to resolve dependencies
COPY pom.xml .
COPY src ./src

# Run Maven to package the application
RUN ./mvnw clean package -DskipTests

# ---------- Runtime stage ----------
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]