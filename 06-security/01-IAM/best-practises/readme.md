# AWS IAM Best Practices — Notes

These notes summarize the AWS IAM best-practices document you provided, keeping AWS's terminology and structure.

## 1. Use Temporary Credentials

**Temporary credentials** are short-lived AWS credentials that expire automatically. They are preferred over permanent access keys because the risk window is much smaller.

### For human users

AWS recommends using **federation** with an **Identity Provider (IdP)** and temporary credentials.

For centralized access management, AWS recommends **AWS IAM Identity Center**.

Typical flow:

```text
Human User
    ↓
Identity Provider / IAM Identity Center
    ↓
Assume IAM Role
    ↓
Temporary Credentials
    ↓
AWS Resources
```

Instead of:

```text
Human User
    ↓
IAM User + Permanent Access Key
    ↓
AWS Resources
```

AWS specifically recommends temporary credentials for human users.

### For workloads

A **workload** is an application, backend process, or other software that needs to access AWS services.

For example:

```text
EC2 Application
      ↓
IAM Role
      ↓
Temporary Credentials
      ↓
S3
```

When running on AWS services such as **EC2** or **Lambda**, AWS can automatically provide temporary role credentials to the workload.

For workloads running outside AWS, AWS provides mechanisms such as:

- IAM Roles Anywhere
- `AssumeRoleWithSAML`
- `AssumeRoleWithWebIdentity`
- AWS IoT Core mTLS
- ECS Anywhere
- EKS Hybrid Nodes
- Systems Manager Hybrid Activations

---

# 2. Require MFA

**MFA (Multi-Factor Authentication)** requires more than just a password to authenticate.

For example:

```text
Password
   +
MFA / Passkey / Security Key
   ↓
Successful authentication
```

AWS recommends **phishing-resistant MFA**, such as **passkeys** and **security keys**, where possible.

MFA is particularly important when IAM users or the root user are required.

---

# 3. Update Access Keys When Needed

AWS recommends **temporary credentials instead of long-term access keys whenever possible**.

A long-term access key consists of credentials such as:

```text
Access Key ID
Secret Access Key
```

If long-term credentials are necessary, they should be reviewed and updated when appropriate.

For example:

```text
Employee leaves company
        ↓
Review access-key usage
        ↓
Update/remove access key
```

AWS recommends using **IAM access last-used information** to determine whether credentials are still needed.

### When might long-term credentials still be needed?

AWS gives examples such as:

- Workloads that cannot use IAM roles
- Third-party AWS clients that don't support IAM Identity Center
- Certain CodeCommit use cases
- Certain Amazon Keyspaces use cases

---

# 4. Protect the Root User

The **root user** is the original identity created when an AWS account is created.

It has extremely powerful permissions, so:

### Do

- Protect root credentials.
- Enable MFA.
- Use root only for tasks that specifically require root access.

### Don't

- Use root for everyday AWS administration.
- Use root credentials for applications.
- Share root credentials.

Think of the root user like the **master key to the entire AWS account**.

AWS recommends protecting root credentials and using them only when necessary.

---

# 5. Apply Least Privilege

**Least privilege** means:

> Give an identity only the permissions it actually needs.

For example, suppose an application only needs to read objects from one S3 bucket.

Bad:

```text
s3:*
Resource: *
```

Better:

```text
s3:GetObject
Resource: arn:aws:s3:::my-bucket/*
```

The goal is to restrict:

```text
WHO
 ↓
CAN DO WHAT
 ↓
ON WHICH RESOURCE
 ↓
UNDER WHICH CONDITIONS
```

AWS recommends reducing permissions over time as you understand the workload better.

---

# 6. Start With AWS Managed Policies, Then Move Toward Least Privilege

**AWS managed policies** are policies created and maintained by AWS.

They are useful when getting started because they provide permissions for common use cases.

However:

> AWS managed policies are designed for broad/common use cases and may provide more permissions than your particular workload needs.

Therefore, AWS recommends eventually creating **customer managed policies** specific to your use case.

A practical approach:

```text
Start
 ↓
AWS Managed Policy
 ↓
Observe actual access
 ↓
IAM Access Analyzer
 ↓
Create narrower policy
 ↓
Least Privilege
```

---

# 7. Use IAM Access Analyzer

**IAM Access Analyzer** is a security tool that helps analyze and validate IAM access.

One important capability is generating policies based on actual access activity recorded by **AWS CloudTrail**.

Flow:

```text
Application
    ↓
Uses AWS APIs
    ↓
CloudTrail records activity
    ↓
IAM Access Analyzer analyzes activity
    ↓
Generate fine-grained policy
    ↓
Test policy
    ↓
Deploy
```

This helps create permissions based on what the workload actually uses rather than guessing.

---

# 8. Remove Unused Users, Roles and Permissions

IAM environments can accumulate unused:

- IAM users
- IAM roles
- Permissions
- Policies
- Credentials

Unused permissions increase the attack surface.

AWS recommends regularly reviewing them using **last accessed information**.

Example:

```text
IAM Role
   ↓
Last accessed information
   ↓
Permission never used
   ↓
Investigate
   ↓
Remove if unnecessary
```

This helps maintain least privilege.

---

# 9. Use Conditions in IAM Policies

An IAM policy can contain **conditions** that must be satisfied before access is allowed.

Instead of:

```text
Allow action
```

You can have:

```text
Allow action
IF condition is satisfied
```

For example, a policy can require requests to use **TLS**.

Conditions can also restrict actions based on how or through which AWS service the request is made.

Conceptually:

```text
User
 ↓
Request
 ↓
IAM Policy
 ↓
Is condition satisfied?
 ├── YES → Allow
 └── NO  → Deny
```

---

# 10. Verify Public and Cross-Account Access

**Public access** means resources may be accessible by anyone on the internet.

**Cross-account access** means an AWS account can access resources belonging to another AWS account.

AWS recommends verifying that such access is actually required.

IAM Access Analyzer can:

- Preview access
- Analyze public access
- Analyze cross-account access
- Generate findings
- Continuously monitor supported resource types

Example:

```text
S3 Bucket
    ↓
IAM Access Analyzer
    ↓
Finding:
"Resource allows public access"
    ↓
Investigate
```

This helps detect accidentally exposed resources.

---

# 11. Validate IAM Policies

IAM policies are written using **JSON** and AWS's IAM policy language.

IAM Access Analyzer can validate policies and provide recommendations.

AWS states that IAM Access Analyzer provides **more than 100 policy checks** for secure and functional policies.

Example workflow:

```text
Write IAM Policy
      ↓
IAM Access Analyzer
      ↓
Policy validation
      ↓
Warnings / recommendations
      ↓
Fix policy
      ↓
Deploy
```

This is useful before deploying IAM policies to production.

---

# 12. Establish Permissions Guardrails Across Multiple Accounts

For larger organizations, AWS recommends using **AWS Organizations** to manage multiple AWS accounts.

Example:

```text
AWS Organization
│
├── Production Account
├── Development Account
├── Testing Account
└── Security Account
```

AWS recommends using:

### SCP — Service Control Policy

An **SCP** establishes permissions guardrails for principals such as IAM users and roles across accounts.

### RCP — Resource Control Policy

An **RCP** establishes permissions guardrails for AWS resources across the organization.

The important concept is:

> SCPs and RCPs do not grant permissions by themselves.

They act as **maximum boundaries/guardrails**. Actual permissions still need identity-based or resource-based policies.

Think:

```text
Actual IAM Permissions
        ↓
       AND
        ↓
Organization Guardrails
        ↓
Effective Permissions
```

---

# 13. Use Permissions Boundaries

A **permissions boundary** is a managed policy that defines the maximum permissions an IAM identity can receive.

Important:

> A permissions boundary does NOT grant permissions by itself.

It limits what permissions an identity-based policy can grant.

Example:

```text
Developer creates IAM Role
          ↓
Role Policy
"Allow S3, EC2, IAM..."
          ↓
Permissions Boundary
"Maximum allowed = S3 + limited EC2"
          ↓
Effective permissions
= intersection of the two
```

This is especially useful when delegating IAM management to developers.

---

# Quick Revision Table

| #   | Best Practice                  | Main Idea                                    |
| --- | ------------------------------ | -------------------------------------------- |
| 1   | Temporary credentials          | Avoid long-lived credentials                 |
| 2   | MFA                            | Add another authentication factor            |
| 3   | Access-key management          | Update/remove long-term keys when needed     |
| 4   | Protect root                   | Don't use root for everyday work             |
| 5   | Least privilege                | Give only required permissions               |
| 6   | AWS managed → customer managed | Start broad, then narrow permissions         |
| 7   | Access Analyzer                | Generate/analyze permissions                 |
| 8   | Remove unused access           | Clean unnecessary identities and permissions |
| 9   | Policy conditions              | Add additional access restrictions           |
| 10  | Public/cross-account analysis  | Detect unintended external access            |
| 11  | Policy validation              | Check IAM policies before deployment         |
| 12  | SCP/RCP guardrails             | Control permissions across organizations     |
| 13  | Permissions boundaries         | Limit delegated IAM permissions              |

The AWS source lists these as the core IAM security best practices.

---

# ⭐ The Big Picture

You can remember AWS IAM security using this progression:

```text
             AWS IAM Security
                    │
        ┌───────────┴───────────┐
        │                       │
   Authentication          Authorization
        │                       │
     MFA / IdP             IAM Policies
        │                       │
 Temporary Credentials      Least Privilege
        │                       │
        └───────────┬───────────┘
                    │
              Access Control
                    │
       ┌────────────┼────────────┐
       │            │            │
 Access Analyzer  Conditions  Guardrails
       │            │            │
       └────────────┼────────────┘
                    │
              Continuous Review
                    │
        Remove unused permissions
```

### One-line memory trick

**Temporary → MFA → Protect Root → Least Privilege → Analyze → Validate → Remove → Restrict → Guardrail**

That is the core idea behind the AWS IAM best-practice document.
