#!/bin/bash
# Azure Infrastructure Setup Script
# Run after setting valid AZURE_SUBSCRIPTION_ID in .env

set -e

source .env

echo "Setting up Azure infrastructure..."
echo "Subscription: $AZURE_SUBSCRIPTION_ID"

# Login to Azure
az login --subscription $AZURE_SUBSCRIPTION_ID

# Create Resource Group
echo "Creating resource group: $AZURE_RESOURCE_GROUP"
az group create --name $AZURE_RESOURCE_GROUP --location $AZURE_LOCATION

# Create App Service Plan
echo "Creating App Service plan: $AZURE_APP_SERVICE_PLAN"
az appservice plan create \
  --name $AZURE_APP_SERVICE_PLAN \
  --resource-group $AZURE_RESOURCE_GROUP \
  --sku B1 \
  --is-linux

# Create Web App
echo "Creating Web App: $AZURE_APP_NAME"
az webapp create \
  --name $AZURE_APP_NAME \
  --resource-group $AZURE_RESOURCE_GROUP \
  --plan $AZURE_APP_SERVICE_PLAN \
  --runtime "PYTHON:3.11"

echo "Azure infrastructure setup complete!"
