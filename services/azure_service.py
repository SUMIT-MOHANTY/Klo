import os
from azure.identity import DefaultAzureCredential
from azure.mgmt.resource import ResourceManagementClient

def get_azure_credentials():
    subscription_id = os.getenv('AZURE_SUBSCRIPTION_ID')
    credential = DefaultAzureCredential()
    return credential, subscription_id

def list_resource_groups():
    credential, subscription_id = get_azure_credentials()
    client = ResourceManagementClient(credential, subscription_id)
    return [rg.name for rg in client.resource_groups.list()]
