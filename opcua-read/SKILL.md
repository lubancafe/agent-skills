---
name: opcua-read
description: Read current values from OPC UA nodes for monitoring and data collection
license: MIT
compatibility: opcua
allowed-tools: read, read_multiple, get_all_variables, browse
version: 1.0.0
---

# OPC UA Read Skill

## When to Use This Skill

Load this skill when you need to:
- Read current sensor values from industrial equipment
- Monitor real-time process status
- Check equipment state and operational parameters
- Gather multiple data points for analysis or reporting
- Discover available sensors and variables in the OPC UA server

## Quick Start

1. **Single Read:** Use when you know the exact node ID
2. **Multiple Read:** Use for batch reading multiple sensors (faster)
3. **Discovery:** Use when you don't know the node IDs

---

## Operations

### 1. Read a Single Node

**When to use:** You know the exact node ID and need one value.

**How to do it:**
```json
{
  "action": "remote_tool_call",
  "target": "opcua",
  "params": {
    "agent_id": "local-dev",
    "connector_id": "opcua",
    "command": "read",
    "nodeId": "<node-id>"
  }
}
```

**Default Connector ID:** Use `"opcua"` as the standard connector ID.

**Multiple OPC UA Servers:** If the edge device has multiple OPC UA connectors, they should be named with suffixes: `"opcua-line1"`, `"opcua-line2"`, `"opcua-lab"`, etc.

**Node ID Format:**
- **Numeric:** `ns=<namespace>;i=<number>`
  - Example: `ns=2;i=101` (namespace 2, identifier 101)
- **String:** `ns=<namespace>;s=<identifier>`
  - Example: `ns=3;s=Temperature_Sensor_1`
- **Server Status:** `ns=0;i=2259` (Server_ServerStatus_CurrentTime)

**Returns:**
```json
{
  "value": 87.3,
  "dataType": "Double",
  "statusCode": "Good",
  "timestamp": "2026-01-14T10:30:00Z"
}
```

---

### 2. Read Multiple Nodes (Batch Read)

**When to use:** You need several values at once (more efficient than individual reads).

**How to do it:**
```json
{
  "action": "remote_tool_call",
  "target": "opcua",
  "params": {
    "agent_id": "local-dev",
    "connector_id": "opcua",
    "command": "read_multiple",
    "nodeIds": [
      "ns=2;i=101",
      "ns=2;i=102",
      "ns=2;i=103"
    ]
  }
}
```

**Returns:**
```json
{
  "ns=2;i=101": {
    "value": 87.3,
    "timestamp": "2026-01-14T10:30:00Z",
    "statusCode": "Good"
  },
  "ns=2;i=102": {
    "value": 2.5,
    "timestamp": "2026-01-14T10:30:00Z",
    "statusCode": "Good"
  },
  "ns=2;i=103": {
    "value": 125.8,
    "timestamp": "2026-01-14T10:30:00Z",
    "statusCode": "Good"
  }
}
```

---

### 3. Discover All Variables

**When to use:** You don't know what sensors are available.

**How to do it:**
```json
{
  "action": "remote_tool_call",
  "target": "opcua",
  "params": {
    "agent_id": "local-dev",
    "connector_id": "opcua",
    "command": "get_all_variables"
  }
}
```

**Returns:**
```json
[
  {
    "name": "Temperature",
    "nodeId": "ns=2;i=101",
    "value": 87.3,
    "dataType": "Double"
  },
  {
    "name": "Pressure",
    "nodeId": "ns=2;i=102",
    "value": 2.5,
    "dataType": "Double"
  }
]
```

---

### 4. Browse Node Hierarchy

**When to use:** You want to explore the node tree structure.

**How to do it:**
```json
{
  "action": "remote_tool_call",
  "target": "opcua",
  "params": {
    "agent_id": "local-dev",
    "connector_id": "<opcua-connector-id>",
    "command": "browse",
    "nodeId": "i=85"
  }
}
```

**Note:** Leave nodeId empty or use `"i=85"` for ObjectsFolder (root).

**Returns:**
```json
[
  {
    "nodeId": "ns=2;i=100",
    "browseName": "Sensors",
    "nodeClass": "Object",
    "displayName": "Sensor Group"
  },
  {
    "nodeId": "ns=2;i=101",
    "browseName": "Temperature",
    "nodeClass": "Variable",
    "displayName": "Reactor Temperature"
  }
]
```

---

## Example Workflows

### Workflow 1: Read Single Sensor
**User Request:** "What's the reactor temperature?"

**Steps:**
1. Load this skill (`opcua-read`)
2. Check `references/common_nodes.md` for reactor temperature node ID
3. Use `read` command with `nodeId: "ns=2;i=101"`
4. Format response: "The reactor temperature is 87.3°C"

**Example Response:**
```
The reactor temperature is 87.3°C (as of 10:30:00 AM)
```

---

### Workflow 2: Monitor Multiple Motors
**User Request:** "Check all motor speeds on Production Line 1"

**Steps:**
1. Load this skill (`opcua-read`)
2. Use `read_multiple` with motor node IDs: `["ns=2;i=301", "ns=2;i=302", "ns=2;i=303", "ns=2;i=304", "ns=2;i=305"]`
3. Present results in table format

**Example Response:**
```
Production Line 1 - Motor Speeds:
┌─────────┬───────────┬────────┐
│ Motor   │ Speed     │ Status │
├─────────┼───────────┼────────┤
│ Motor 1 │ 1450 RPM  │ Good   │
│ Motor 2 │ 1445 RPM  │ Good   │
│ Motor 3 │ 1460 RPM  │ Good   │
│ Motor 4 │ 1455 RPM  │ Good   │
│ Motor 5 │ 1440 RPM  │ Good   │
└─────────┴───────────┴────────┘
```

---

### Workflow 3: Discover and Filter
**User Request:** "Show me all temperature sensors in the system"

**Steps:**
1. Load this skill (`opcua-read`)
2. Use `get_all_variables` to get all variables
3. Filter results where name contains "Temperature" or "Temp"
4. Present filtered list with node IDs

**Example Response:**
```
Temperature Sensors Found:
1. Reactor Temperature (ns=2;i=101) - Current: 87.3°C
2. Cooling Water Temp (ns=2;i=201) - Current: 22.5°C
3. Outlet Temperature (ns=2;i=301) - Current: 45.2°C
```

---

### Workflow 4: Read and Save Report
**User Request:** "Check all critical sensors and save a status report"

**Steps:**
1. Load this skill (`opcua-read`)
2. Use `read_multiple` for critical sensors
3. Format data as markdown
4. Use filesystem skill to write report

**Example:**
```json
// Step 1: Read sensors
{
  "action": "remote_tool_call",
  "target": "opcua",
  "params": {
    "connector_id": "factory-opcua",
    "command": "read_multiple",
    "nodeIds": ["ns=2;i=101", "ns=2;i=102", "ns=2;i=201"]
  }
}

// Step 2: Write report
{
  "action": "remote_tool_call",
  "target": "filesystem",
  "params": {
    "command": "write",
    "path": "reports/sensor-status-2026-01-14.md",
    "content": "# Sensor Status Report\n\n..."
  }
}
```

---

## Common Node IDs

See `references/common_nodes.md` for factory-specific node ID mappings.

**Standard OPC UA Nodes:**
- `ns=0;i=2259` - Server_ServerStatus_CurrentTime
- `ns=0;i=2256` - Server_ServerStatus_State
- `i=85` - ObjectsFolder (root for browsing)

---

## Data Types

Common OPC UA data types you'll encounter:

| Data Type | Description | Example Value |
|-----------|-------------|---------------|
| `Double` | Floating point number | 87.3 |
| `Float` | Single-precision float | 12.5 |
| `Int32` | 32-bit integer | 1450 |
| `Int16` | 16-bit integer | 255 |
| `Boolean` | True/False | true |
| `String` | Text | "Running" |
| `DateTime` | Timestamp | "2026-01-14T10:30:00Z" |

---

## Status Codes

**Good (0x00000000):** Value is valid and reliable
**Uncertain:** Value may not be accurate
**Bad:** Value is invalid or unavailable

Always check the `statusCode` field in results.

---

## Tips & Best Practices

### 1. Use Batch Reads
Instead of:
```
read(ns=2;i=101)
read(ns=2;i=102)
read(ns=2;i=103)
```

Do this:
```
read_multiple(["ns=2;i=101", "ns=2;i=102", "ns=2;i=103"])
```

### 2. Discovery First
If you don't know node IDs:
1. Use `get_all_variables` to see what's available
2. Or use `browse` to explore the hierarchy
3. Then use specific node IDs for targeted reads

### 3. Check Status Codes
Always verify `statusCode: "Good"` before trusting the value.

### 4. Cache Node IDs
Once you discover a node ID, save it in your response for future reference.

### 5. Format Numbers Appropriately
- Temperature: 1 decimal place (87.3°C)
- Pressure: 2 decimal places (2.45 bar)
- RPM: Whole numbers (1450 RPM)
- Percentages: Whole numbers (75%)

---

## Error Handling

### Common Errors

**Error:** "Connector not found"
- **Cause:** Invalid connector_id
- **Fix:** Check available OPC UA connectors

**Error:** "Node not found"
- **Cause:** Invalid nodeId or node doesn't exist
- **Fix:** Use `browse` or `get_all_variables` to find correct node

**Error:** "Bad status code"
- **Cause:** Node exists but value is unavailable
- **Fix:** Check if sensor is connected and functioning

**Error:** "Connection timeout"
- **Cause:** OPC UA server unreachable
- **Fix:** Verify server is running and network is accessible

---

## Scripts

### read_node.py (Optional)

Helper script for formatted output:

```bash
python scripts/read_node.py <connector_id> <nodeId>
```

Returns human-readable formatted output based on data type.

---

## References

- **common_nodes.md**: Factory-specific node ID reference
- **node_id_format.md**: Complete guide to OPC UA node ID syntax

---

## Related Skills

- **opcua-write**: For control operations (writing setpoints)
- **opcua-discovery**: For advanced node exploration
- **opcua-historian**: For historical trend analysis
- **opcua-diagnostics**: For health monitoring

---

## Version History

**1.0.0** (2026-01-14)
- Initial release
- Basic read operations
- Discovery capabilities
