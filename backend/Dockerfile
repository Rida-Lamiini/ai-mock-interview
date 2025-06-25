# ---------- Build stage ----------
FROM eclipse-temurin:21-jdk-jammy AS build

WORKDIR /app

# Copy Maven wrapper scripts & config
COPY mvnw .
COPY .mvn .mvn

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Make sure mvnw is executable
RUN chmod +x ./mvnw

# Run Maven build without tests
RUN ./mvnw clean package -DskipTests

# ---------- Runtime stage ----------
FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
