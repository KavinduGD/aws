# AWS Elastic Load Balancing Interview Questions

## 1. What is Load Balancing?

Load balancing is the process of:
*   **Distributing incoming traffic**
*   **Across multiple servers**

**Purpose:**
*   Prevent overload
*   Increase availability
*   Improve performance

## 2. Why do we need a Load Balancer?

**Without load balancer:**
*   Client → Single Server → Crash under heavy load

**With load balancer:**
*   Client → Load Balancer → Multiple Servers

**Benefits:**
*   High availability
*   Scalability
*   Fault tolerance

## 3. What is AWS Elastic Load Balancing?

Elastic Load Balancing (ELB) is a service provided by Amazon Web Services that automatically distributes traffic to:
*   EC2 instances
*   Containers
*   IP addresses

## 4. What are the types of Load Balancers in AWS?

AWS provides:
*   **Application Load Balancer (ALB)**
*   **Network Load Balancer (NLB)**
*   **Gateway Load Balancer (GWLB)**
*   *(Older Classic Load Balancer is mostly deprecated.)*

## 5. What is Application Load Balancer (ALB)?

**ALB works at:**
*   Layer 7 (Application layer)

**Supports:**
*   HTTP
*   HTTPS
*   Path-based routing
*   Host-based routing

**Used for:**
*   Web applications
*   Microservices

## 6. What is Network Load Balancer (NLB)?

**NLB works at:**
*   Layer 4 (Transport layer)

**Supports:**
*   TCP
*   UDP

**Used for:**
*   High performance
*   Low latency
*   Millions of requests per second

## 7. What is the difference between ALB and NLB?

| Feature | Application Load Balancer (ALB) | Network Load Balancer (NLB) |
| :--- | :--- | :--- |
| **Layer** | Layer 7 | Layer 4 |
| **Protocol** | HTTP/HTTPS | TCP/UDP |
| **Routing** | Path-based routing | No path routing |
| **Performance** | Slower but smarter | Very fast |

## 8. What is a Target Group?

**Target Group:**
*   Logical group of backend servers
*   Load balancer sends traffic to target group
*   Target group forwards to instances

**Targets can be:**
*   EC2
*   IP addresses
*   Lambda

## 9. What is a Listener?

**Listener:**
*   Process that checks incoming connections
*   Defined by port and protocol

**Example:**
*   Port 80 → HTTP
*   Port 443 → HTTPS

## 10. What is Health Check in Load Balancer?

**Health check verifies:**
*   Is backend server healthy?
*   Is app responding correctly?

**If unhealthy:**
*   Load balancer stops sending traffic

## 11. What happens if one EC2 instance fails?

**Load balancer:**
*   Detects unhealthy instance
*   Stops routing traffic to it
*   ASG (Auto Scaling Group) may replace it
*   System continues working.

## 12. What is Cross-Zone Load Balancing?

**If enabled:**
*   Load balancer distributes traffic evenly
*   Across instances in different Availability Zones
*   Improves high availability.

## 13. What is SSL Termination?

**SSL termination means:**
*   HTTPS decrypted at Load Balancer
*   Backend servers receive HTTP

**Advantages:**
*   Offloads CPU work
*   Simplifies backend

## 14. What is Sticky Session (Session Affinity)?

**Sticky session:**
*   User always routed to same backend server

**Useful when:**
*   Application stores session locally
*   But not ideal for scalable design.

## 15. What is Path-Based Routing?

ALB can route based on URL path:

**Example:**
*   `/api` → Backend 1
*   `/admin` → Backend 2

*Useful for microservices.*

## 16. What is Host-Based Routing?

ALB can route based on domain name:

**Example:**
*   `api.example.com` → API service
*   `app.example.com` → Frontend

## 17. How does Load Balancer work with Auto Scaling?

**Flow:**
*   Client → Load Balancer → Target Group → EC2

**When ASG adds instance:**
*   Automatically registered to target group

**When removed:**
*   Deregistered automatically

## 18. Where should Load Balancer be placed in VPC?

**Best practice:**
*   Load Balancer in **Public Subnet**
*   Backend EC2 in **Private Subnet**

**Architecture:**
*   Internet → ALB (public) → EC2 (private)

## 19. DevOps Scenario Question

👉 **“Your website is returning 502 Bad Gateway. What do you check?”**

**You check:**
*   Target group health
*   EC2 running?
*   Security group rules
*   Port mismatch
*   Application logs
*   Health check path correct?

## 20. When should you use NLB instead of ALB?

**Use NLB when:**
*   Need extremely high performance
*   Need static IP
*   TCP-level routing
*   Non-HTTP traffic

**Use ALB for:**
*   Web applications
*   Path-based routing
*   Microservices
