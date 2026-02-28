# Azure Infrastructure Setup

## Overview
This project sets up foundational Azure infrastructure with placeholder credentials.

## Prerequisites
- Azure CLI installed
- Valid Azure subscription

## Setup Steps

1. Update `.env` with your Azure subscription ID
2. Run: `chmod +x azure_setup.sh && ./azure_setup.sh`

## Configuration
- Resource Group: `rg-myapp-sandbox`
- App Service Plan: `asp-myapp-sandbox` (Basic tier)
- Web App: `app-myapp-sandbox`

## Files
- `.env` - Environment variables
- `config/azure.json` - Azure resource config
- `config/app.json` - Application config
- `azure_setup.sh` - Infrastructure creation script
