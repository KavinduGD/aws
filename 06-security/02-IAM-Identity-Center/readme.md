# IAM Identity Center

- On July 26, 2022, AWS Single Sign-On was renamed to AWS IAM Identity Center.
- AWS IAM Identity Center is a service that lets you centrally manage user identities and access to multiple AWS accounts and business applications using a single sign-on (SSO) experience.
- It is the recommended way to manage human users in AWS organizations.
- We can use both AWS IAM and AWS IAM Identity Center at the same time (You can still have IAM users in your AWS accounts even if IAM Identity Center is enabled.)

---

## IAM Identity Center instance types

There are **two ways to create it**:

### 1. Organization instance — 🏢 Central AWS login

This is the **recommended option**.

Imagine you have:

```text
AWS Organization
│
├── Account A
├── Account B
└── Account C
```

You create **one IAM Identity Center** in the **Organizations management account**:

```text
              IAM Identity Center
                      │
          ┌───────────┼───────────┐
          ↓           ↓           ↓
      Account A   Account B   Account C
```

Now you can centrally say:

> Kavindu → can access Account A as Developer
> Kavindu → can access Account B as Administrator
> Another user → can access Account C as ReadOnly

So you have **one place to manage users and their access to multiple AWS accounts**.

This is what you normally want for a company/production environment.

---

### 2. Account instance — 🏠 One AWS account only

An **account instance** belongs to **one specific AWS account**.

For example:

```text
AWS Account A
│
└── IAM Identity Center
```

It doesn't act as a central access-management system for your whole AWS Organization.

It's mainly intended for **isolated use of certain AWS applications**.

---

### The easiest way to remember

| Type                      | Think of it as                     | Main purpose                      |
| ------------------------- | ---------------------------------- | --------------------------------- |
| **Organization instance** | 🏢 Company-wide login system       | Manage access across AWS accounts |
| **Account instance**      | 🏠 Login system inside one account | Isolated AWS application use      |

---

## Add single sign-on (SSO) using Microsoft Entity Manager (Azure AD)

- Change identity source to **External identity provider**.
- create a Enterprise application in Azure AD.
- Add the **AWS IAM Identity Center** application to Azure AD.

### System for Cross-domain Identity Management (SCIM)

- SCIM is an open standard that allows you to automate the exchange of user identity information between identity domains or IT systems.
- It is used to automatically provision and de-provision users in AWS IAM Identity Center from Azure AD.

---

## Applications in IAM Identity Center

- Applications are applications that your users can access through the same IAM Identity Center login.
- "After a user logs into IAM Identity Center, what other applications can they open?"

```
Microsoft Entra ID
       ↓
IAM Identity Center
       ↓
   User logs in
       ↓
 ┌───────────────┐
 │ AWS Accounts  │
 │ Salesforce    │
 │ Slack         │
 │ GitHub        │
 │ Other apps    │
 └───────────────┘
```

- The Applications section is mainly for giving users SSO access to applications outside AWS.

---

resources:

- https://www.youtube.com/watch?v=iSCuTJNeN6c

```

```
