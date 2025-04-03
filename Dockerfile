# ===== ETAPA DE CONSTRUCCIÓN =====
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar y restaurar dependencias
COPY ["TicketApi.sln", "."]
COPY ["TicketApi/TicketApi.csproj", "TicketApi/"]
RUN dotnet restore "TicketApi/TicketApi.csproj"

# Copiar el código y publicar
COPY "TicketApi/." "TicketApi/"
WORKDIR "/src/TicketApi"
RUN dotnet publish -c Release -o /app/publish

# ===== ETAPA DE EJECUCIÓN =====
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Configuración para HTTP (equivalente al perfil "http" de launchSettings.json)
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS=http://+:80 

EXPOSE 80  
ENTRYPOINT ["dotnet", "TicketApi.dll"]