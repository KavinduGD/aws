##ELB

## types of ELB

- **Classic Load Balancer**: layer 4 (TCP) and layer 7 (HTTP/HTTPS) .

- **Application Load Balancer**: layer 7 (HTTP/HTTPS), load balancing of HTTP traffic.

<img src="./images/ELB.png" alt="ELB Diagram" width="600"/>

- **Network Load Balancer**: Operates at layer 4 (TCP),millions of requests per second, ultra-low latencies.

- **Gateway Load Balancer**: Combines a transparent network gateway with a load balancer.

## ELB architecture

<img src="./images/ELB-architecture.png" alt="ELB Architecture" width="600"/>

- When you create a load balancer, AWS assigns it a DNS name, not a fixed IP address.
  That DNS name is backed by multiple IPs, each mapping to a load balancer node in different Availability Zones (AZs).

Example:

```bash
$ nslookup myapp-lb-123456789.us-east-1.elb.amazonaws.com
Name: myapp-lb-123456789.us-east-1.elb.amazonaws.com
Addresses: 52.86.10.33
           52.23.91.71
           18.215.112.54
```

- Those IPs are not static — AWS can add or remove them dynamically.
- Each IP points to a load balancer node, and these nodes are managed by AWS in multiple AZs for fault tolerance.
