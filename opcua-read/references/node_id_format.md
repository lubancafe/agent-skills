# OPC UA Node ID Format Guide

## Overview

OPC UA node IDs uniquely identify nodes in the address space. Understanding the format is essential for reading and navigating OPC UA servers.

---

## Node ID Components

A complete node ID consists of:
1. **Namespace** - Separates different node sets
2. **Identifier Type** - How the node is identified
3. **Identifier Value** - The actual identifier

---

## Format Syntax

### General Pattern
```
ns=<namespace>;[i|s|g|b]=<identifier>
```

Where:
- `ns` = Namespace index (number)
- `i` = Numeric identifier
- `s` = String identifier
- `g` = GUID identifier
- `b` = Opaque (ByteString) identifier

---

## Identifier Types

### 1. Numeric Identifiers (Most Common)

**Format:** `ns=<namespace>;i=<number>`

**Examples:**
```
ns=0;i=2259    - Server time (namespace 0, identifier 2259)
ns=2;i=101     - Custom node (namespace 2, identifier 101)
i=85           - Shorthand for ns=0;i=85 (ObjectsFolder)
```

**Usage:**
- Most efficient and compact
- Standard OPC UA nodes use namespace 0
- Custom nodes typically use namespace 2 or higher

---

### 2. String Identifiers

**Format:** `ns=<namespace>;s=<string>`

**Examples:**
```
ns=3;s=Temperature_Sensor_1
ns=2;s=Reactor/Temperature
ns=2;s=ProductionLine1.Motor1.Speed
```

**Usage:**
- Human-readable
- Common in custom implementations
- Often follows hierarchical naming (dot or slash notation)

---

### 3. GUID Identifiers (Rare)

**Format:** `ns=<namespace>;g=<guid>`

**Example:**
```
ns=2;g=09087e75-8e5e-499b-954f-f2a9603db28a
```

**Usage:**
- Globally unique
- Used in distributed systems
- Less common in industrial automation

---

### 4. Opaque Identifiers (Very Rare)

**Format:** `ns=<namespace>;b=<base64-encoded-bytes>`

**Example:**
```
ns=2;b=M/RbKBsRVkePCePcx24oRA==
```

**Usage:**
- Binary data as identifier
- Rarely used in practice

---

## Namespace Index

### Standard Namespaces

| Namespace | Description |
|-----------|-------------|
| `ns=0` | OPC UA standard nodes (defined by specification) |
| `ns=1` | OPC UA companion specifications |
| `ns=2+` | Server-specific / custom nodes |

### Namespace 0 - Standard Nodes

Common nodes in namespace 0 (no `ns=` prefix needed):

```
i=84     - Root
i=85     - Objects folder
i=86     - Types folder
i=87     - Views folder
i=2253   - Server object
i=2256   - ServerStatus/State
i=2259   - ServerStatus/CurrentTime
```

---

## Shorthand Notation

### When Namespace = 0

You can omit `ns=0;` for standard nodes:

**Long form:** `ns=0;i=85`
**Short form:** `i=85`

Both are equivalent.

---

## Browse Names vs Node IDs

### Important Distinction

**Browse Name:** Human-readable name (e.g., "Temperature")
**Node ID:** Unique identifier (e.g., "ns=2;i=101")

**Example:**
```
Browse Name: "Reactor Temperature"
Node ID: ns=2;i=101
Display Name: "Reactor R-101 Temperature Sensor"
```

- **Browse Name:** Used for navigation in hierarchy
- **Node ID:** Used for direct access (reading/writing)
- **Display Name:** User-friendly label

---

## Hierarchical Paths (Not Standard Node IDs)

Some servers support path-based addressing (non-standard):

```
/Objects/Reactor/Temperature
Root.Objects.ProductionLine1.Motor1.Speed
```

**Note:** Always prefer official node IDs (`ns=X;i=Y`) for reliability.

---

## Finding Node IDs

### Method 1: Browse from Root
```json
{
  "command": "browse",
  "nodeId": "i=85"
}
```

Returns child nodes with their node IDs.

### Method 2: Get All Variables
```json
{
  "command": "get_all_variables"
}
```

Returns all variables with names and node IDs.

### Method 3: Use OPC UA Client Tools
- UAExpert (Unified Automation)
- Prosys OPC UA Browser
- opcua-commander (command line)

---

## Node ID Examples by Industry

### Manufacturing
```
ns=2;i=1001    - Assembly Line Speed
ns=2;i=1002    - Quality Check Status
ns=2;s=Robot1.Position
ns=2;s=Conveyor.Belt1.Speed
```

### Energy/Utilities
```
ns=2;i=5001    - Grid Voltage
ns=2;i=5002    - Load Current
ns=2;s=Transformer1.Temperature
ns=2;s=Breaker.CB1.State
```

### Chemical Processing
```
ns=2;i=101     - Reactor Temperature
ns=2;i=102     - Reactor Pressure
ns=2;s=Vessel.V101.Level
ns=2;s=Pump.P201.FlowRate
```

---

## Best Practices

### 1. Use Numeric IDs When Possible
- Faster lookups
- More compact
- Better performance

### 2. Document Custom Namespaces
Keep a mapping of what each namespace contains:
```
ns=0: OPC UA standard
ns=1: PLCopen companion spec
ns=2: Reactor control system
ns=3: SCADA integration
```

### 3. Use Consistent Naming for String IDs
If using string identifiers, follow a convention:
```
Good:  ns=2;s=Line1.Motor1.Speed
       ns=2;s=Line1.Motor2.Speed

Bad:   ns=2;s=motor_speed_line1_1
       ns=2;s=Line1Motor2RPM
```

### 4. Validate Node IDs
Always verify a node ID exists before using it extensively:
```json
{
  "command": "read",
  "nodeId": "ns=2;i=101"
}
```

If it fails, the node doesn't exist or isn't accessible.

---

## Common Mistakes

### ❌ Incorrect
```
ns2;i=101           - Missing '=' after ns
ns=2:i=101          - Using ':' instead of ';'
ns=2;i="101"        - Numeric ID shouldn't be quoted in JSON params
ns=2;i=101.5        - Numeric IDs must be integers
ns=two;i=101        - Namespace must be a number
```

### ✅ Correct
```
ns=2;i=101
ns=3;s=Temperature_Sensor_1
i=85               (shorthand for ns=0;i=85)
```

---

## Advanced: Relative Paths

OPC UA also supports browsing via relative paths (browse paths):

```
/2:Reactor/2:Temperature
```

This means:
- Start from current node
- Follow reference to "Reactor" (in namespace 2)
- Then to "Temperature" (in namespace 2)

**Note:** Relative paths are less common. Use direct node IDs when possible.

---

## Testing Node IDs

Quick test to verify a node ID works:

```json
{
  "action": "remote_tool_call",
  "target": "opcua",
  "params": {
    "connector_id": "factory-opcua",
    "command": "read",
    "nodeId": "ns=2;i=101"
  }
}
```

**Success:** Returns value
**Failure:** Error indicates node doesn't exist or isn't readable

---

## Resources

- **OPC UA Specification:** Part 3 (Address Space Model)
- **Node ID Documentation:** OPC Foundation website
- **Tools:**
  - UAExpert - Browse and explore node IDs
  - Prosys OPC UA Browser - Free OPC UA client
  - opcua-commander - CLI tool for exploration

---

**Last Updated:** 2026-01-14
**OPC UA Specification Version:** 1.04
