# SentinelX V7 Ultimate: End-to-End Live Demonstration Walkthrough Guide

## Overview
This guide provides a step-by-step procedure for demonstrating SentinelX V7 Ultimate live during hackathon evaluations, investor reviews, or technical audits.

---

## Scenario: "Digital Arrest Scam Interception & Section 65B Evidence Generation"

### Step 1: Open Command Centre Dashboard
1. Launch `apps/command-centre`:
   ```bash
   cd apps/command-centre
   npm run dev
   ```
2. Navigate to `http://localhost:5173`.
3. View **Executive Overview Tab**: Highlight the 4 KPI cards, live signal intercepts, and **System State: OPERATIONAL** badge.

### Step 2: Trigger Command Palette (Ctrl+K / Cmd+K)
1. Press `Ctrl+K` or `Cmd+K`.
2. Type `Simulator` and press `Enter` to switch directly to the **Incident Simulator Tab**.

### Step 3: Run Live Call Incident Simulation
1. Click **Initiate Incident Simulation**.
2. Observe real-time call transcript streaming:
   > *"This is CBI officer. There is an arrest warrant against you for narcotics trafficking. Do not leave the camera..."*
3. Watch the **12-Agent Autonomous Mesh Status Grid** reflect live multi-agent execution:
   - `PlannerAgent`: Deconstructs incident pipeline
   - `FraudAgent`: Traverses Neo4j mule accounts
   - `VisionAgent`: OpenCV macro-topography check
   - `RiskAgent`: Computes composite MCDA threat score (**0.94 CRITICAL**)
   - `CommunicationAgent`: Generates multilingual warning in English/Hindi
   - `EvidenceAgent`: Assembles Section 65B PDF evidence package

### Step 4: Inspect Section 65B Forensic Evidence Package
1. Switch to **Case Ledger Tab**.
2. Click **Forensics** on Case Reference `SX-2026-0041`.
3. Inspect the Section 65B Digital Evidence Package modal:
   - SHA-256 Digest: `e3b0c44298fc1c149afbf...`
   - HSM Digital Signature: `0x8f9a2b1c4d3e5f...`
4. Click **Download Signed PDF** to verify PDF output.

### Step 5: Verify Counterfeit Currency Scanner
1. Switch to **Counterfeit Scanner Tab**.
2. Select **₹500 Note** and click **Run OpenCV Counterfeit Diagnostics**.
3. View failed markers:
   - `security_thread_variance`: Optical shift check failed (Hue variance 2.14 vs expected >8.0).
   - `microprint_clarity`: Edge density 0.0112 vs expected >0.02.
