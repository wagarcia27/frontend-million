# Use the official .NET 9 runtime as base image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Use the official .NET 9 SDK for building
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["PropertyApi.csproj", "./"]
RUN dotnet restore "PropertyApi.csproj"
COPY . .
RUN dotnet build "PropertyApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PropertyApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PropertyApi.dll"]
