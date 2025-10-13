# Firewalls in VPC

There are main 2 types of firewalls in VPC:

- Security Groups
- Network ACLs

<img src="./images/firewalls.png" alt="firewalls" width="600"/>

## Security Groups

- **Stateful**: If you allow an incoming request, the response is automatically allowed regardless of outbound rules. and vice versa.
- Operate at the instance level.
- Actually attach to Elastic Network Interfaces.
- Support allow rules only.
- Cannot block specific IP addresses, only allow specific IP addresses.
- Can attach multiple security groups to one instance.

## Inbound Rules

- **🛑 For returning inbound traffic, inbound rules are not evaluated. Instead, the return traffic is allowed automatically if the original request was allowed.**
- In inbound rules, we only focus on the traffic that is coming from outside to the instance.
- By default, all inbound traffic is blocked.

## Outbound Rules

- **🛑 For returning outbound traffic outbound rules are not evaluated. Instead, the return traffic is allowed automatically if the inbound rule for the original request was allowed.**
- In outbound rules, we only focus on the traffic that send from the instance to the outside world not the returning traffic.
- By default, all outbound traffic is allowed.

---

## Network ACLs

- **Stateless**: Returning traffic must be explicitly allowed by rules.
- Operate at the subnet level.
- Default NACLs allow all inbound and outbound traffic.
- Support allow and deny rules.
- Can block specific IP addresses.

<img src="./images/acl.png"  width="800"/>

## Security Groups vs Network ACLs

<img src="./images/sgvsacl.png" alt="sg-vs-nacl" width="600"/>
