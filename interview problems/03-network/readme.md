# AWS Networking Interview Questions

## 1. What is a VPC?
**VPC (Virtual Private Cloud)** is a logically isolated virtual network inside Amazon Web Services.

It allows you to:
- Define IP ranges
- Create subnets
- Control routing
- Isolate resources
- Configure security

Think of VPC as your private data center in AWS.

## 2. What is CIDR in VPC?
**CIDR (Classless Inter-Domain Routing)** defines the IP range.

**Example:** `10.0.0.0/16`

**Meaning:**
- 65,536 total IP addresses
- The `/16` defines the subnet mask.

## 3. What is a Subnet?
A subnet is a smaller network inside a VPC.

**Example:**
- VPC: `10.0.0.0/16`
- Subnets: `10.0.1.0/24`, `10.0.2.0/24`

Subnets are created in a specific **Availability Zone (AZ)**.

## 4. What is a Public Subnet?
A subnet is public if:
- It has a route to an **Internet Gateway (IGW)**
- Instances have public IPs

**Used for:**
- Web servers
- Bastion hosts
- Load balancers

## 5. What is a Private Subnet?
A subnet without a direct route to the internet.

**Used for:**
- Databases
- Internal services
- Backend systems

It is more secure.

## 6. What is an Internet Gateway (IGW)?
**Internet Gateway:**
- Allows VPC to connect to the internet
- Attached to VPC
- Enables inbound & outbound internet access

Without IGW → no internet access.

## 7. What is a Route Table?
A route table defines where traffic should go.

**Example route:**
`0.0.0.0/0` → `igw-1234`

**Meaning:** All internet traffic goes to the Internet Gateway.

## 8. What is the default route (0.0.0.0/0)?
It represents:
- All IPv4 addresses
- Default route to the internet

If this route points to an IGW → it's a public subnet.

## 9. What is a NAT Gateway?
**NAT Gateway** allows private subnet instances to access the internet (outbound only).

**Used for:**
- Installing updates
- Downloading packages

It does **NOT** allow inbound internet traffic.

## 10. Why does NAT Gateway need Elastic IP?
NAT Gateway must have a public IP to communicate with the internet.

**Elastic IP provides:**
- A static public IP
- Requirement for NAT

## 11. What is an Elastic IP?
**Elastic IP:**
- Static public IP
- Can attach/detach from instances

Unlike a default public IP, it does not change after a restart.

## 12. What is the difference between NAT Gateway and Internet Gateway?

| Feature | NAT Gateway | Internet Gateway |
| :--- | :--- | :--- |
| **Direction** | Outbound only | Inbound + Outbound |
| **Usage** | Private subnet | Public subnet |
| **Elastic IP** | Required | No |

## 13. What is Network ACL?
**Network ACL (NACL):**
- Subnet-level firewall
- Stateless
- Controls inbound & outbound rules

## 14. What is Security Group?
**Security Group:**
- Instance-level firewall
- Stateful
- Controls traffic per EC2 instance

## 15. What is the difference between Security Group and NACL?

| Feature | Security Group | NACL |
| :--- | :--- | :--- |
| **State** | Stateful | Stateless |
| **Level** | Instance | Subnet |
| **Rules** | Allow rules only | Allow + Deny rules |

## 16. What is VPC Peering?
**VPC Peering:**
- Connects two VPCs
- Enables private communication
- Traffic stays within the AWS network

## 17. What is Transit Gateway?
**Transit Gateway:**
- Connects multiple VPCs
- Uses a Hub-and-spoke architecture
- Simplifies complex networking
- Used in large organizations

## 18. What is a Bastion Host?
**Bastion Host:**
- An EC2 instance in a public subnet
- Used to SSH into private instances
- Acts as a jump server

## 19. What happens if a private subnet has no NAT?
Instances in the private subnet:
- Cannot access the internet
- Cannot install updates
- Cannot download packages

## 20. What is an Availability Zone?
**Availability Zone (AZ):**
- Physically separate data centers
- Located within the same region
- Subnets exist in a specific AZ

## 21. How do you make a subnet public?
**Steps:**
1. Attach an Internet Gateway to the VPC
2. Add a route: `0.0.0.0/0` → IGW
3. Assign a public IP to the instance

## 22. How do you make a subnet private?
**Steps:**
1. Do **NOT** add an IGW route
2. Add a route: `0.0.0.0/0` → NAT Gateway

## 23. What is a VPC Endpoint?
**VPC Endpoint** allows a private connection to AWS services without using the internet.

**Example:** Access S3 privately.

## 24. What is Gateway Endpoint vs Interface Endpoint?

**Gateway Endpoint:**
- Used for S3, DynamoDB
- Free

**Interface Endpoint:**
- Uses ENI (Elastic Network Interface)
- Has a Private IP
- Used for many AWS services

## 25. What is Elastic Network Interface (ENI)?
**ENI:**
- Virtual network card
- Has a private IP
- Can attach to an EC2 instance

## 26. Can a subnet span multiple AZs?
**No.** A subnet belongs to only one AZ.

**For High Availability (HA):** Create multiple subnets in different AZs.

## 27. How do you design a highly available VPC?
**Best practice:**
- 2+ public subnets (in different AZs)
- 2+ private subnets (in different AZs)
- NAT Gateway per AZ
- Load balancer in the public subnet

## 28. Why do we place databases in a private subnet?
**For security:**
- No direct internet access
- Only the backend can connect
- Reduces the attack surface

## 29. What is a default VPC?
**Default VPC:**
- Created automatically
- Has a public subnet
- Internet access is enabled
- Used for quick testing