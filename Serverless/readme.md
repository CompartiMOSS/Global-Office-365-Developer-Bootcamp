# Serverless para Office 365 using Azure Functions

## Overview

Functions have been the basic building blocks of software since the first lines of code were written and the need for code organization and reuse became a necessity. Azure Functions expand on these concepts by allowing developers to create "serverless", event-driven functions that run in the cloud and can be shared across a wide variety of services and systems, uniformly managed, and easily scaled based on demand. In addition, Azure Functions can be written in a variety of languages, including C#, JavaScript, Python, Bash, and PowerShell, and they're perfect for building apps and nanoservices that employ a compute-on-demand model.

At the end of this workshop, you have a lab where you will create an Azure Function that request for an access token to access Office 365 resources using Microsoft Graph.

## Objectives

In this hands-on lab, you will learn how to:
- Create an Azure Function App
- Write an Azure Function that uses a http trigger
- Write an Azure Function that uses a timer trigger
- Write an Azure Function that uses a storage queue trigger
- Register an application on Azure Active Directory
- Write an Azure Function that request for an access token and use it to receive resources from Microsoft Graph

## Prerequisites

The following are required to complete this workshop labs:
- An active Microsoft Azure subscription. If you don't have one, sign up for a free trial.
- Microsoft Azure Storage Explorer (optional)
- Office 365 Tenant

## Exercises

This hands-on lab includes the following exercises:
- [Lab 1: Create your first Function](./Lab1/readme.md)
- [Lab 2: Create your first Function with Visual Studio](./Lab2/readme.md)
- [Lab 3: Create a Function in Azure that is triggered by a timer](./Lab3/readme.md)
- [Lab 4: Create a Function triggered by Azure Queue storage](./Lab4/readme.md)
- [Lab 5: Calling Microsoft Graph from a Function](./Lab5/readme.md)
