# The Four Message Categories

| Category           | Format Type                    | Core Meaning & Purpose                                                                                                                                        | Real-World Example                                                       |
| ------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Utility**        | Pre-approved Template          | Follow-ups on a specific action or transaction the user already requested or completed.                                                                       | `"Your order #4021 has been confirmed. View receipt: [Link]"`            |
| **Authentication** | Pre-approved Template (Strict) | Verifying a user's identity using a one-time passcode (OTP). Must use Meta's fixed security templates with zero promotional text.                             | `"123456 is your verification code. It expires in 10 minutes."`          |
| **Marketing**      | Pre-approved Template          | Anything promotional, re-engagement, or awareness-focused that isn't strictly transactional. _(Note: Currently restricted for US numbers on the calculator)._ | `"Hey Sarah! Our weekend sale starts now—get 20% off with code SAVE20."` |
| **Service**        | Free-form (Non-template)       | Natural back-and-forth customer support replies to resolve a question or issue initiated by the user.                                                         | `"Hi! Let me check on that delivery delay for you right now."`           |

---

## 3. What is the "Customer Service Window"?

The **Customer Service Window** is a **24-hour timer** that starts the exact moment a customer sends a message _to_ your business on WhatsApp. Every time the customer sends you another message, the 24-hour timer resets.

- **While the 24-hour window is OPEN:** You can reply with normal, free-form text (**Service messages**) without needing pre-approved templates. Additionally, if you send a **Utility template** while this window is open, Meta's template fee is **$0.00** (you only pay Twilio's flat $0.005 handling fee).
- **When the 24-hour window is CLOSED (or never opened):** You are completely blocked from sending free-form Service messages. To reach the customer, you **must** send a pre-approved **Utility, Authentication, or Marketing template**, and you will pay both Twilio's fee and Meta's template fee.

