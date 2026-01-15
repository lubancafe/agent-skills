# opcua-read Skill

**Version:** 1.0.0
**License:** MIT
**Compatibility:** opcua
**Status:** ✅ Ready for Testing

---

## Overview

The `opcua-read` skill enables AI agents to read current values from OPC UA (Open Platform Communications Unified Architecture) industrial control systems. This skill provides a standardized interface for monitoring sensors, checking equipment status, and gathering real-time process data.

---

## What This Skill Does

- ✅ Read single sensor values (temperature, pressure, flow, etc.)
- ✅ Batch read multiple sensors efficiently
- ✅ Discover all available variables on an OPC UA server
- ✅ Browse node hierarchy to explore the server structure
- ✅ Format values appropriately based on data type and unit
- ✅ Handle errors gracefully with helpful guidance

---

## Quick Start

### 1. Load the Skill

The agent automatically loads this skill when OPC UA read operations are needed.

### 2. Basic Usage

**User Query:**
```
"What's the reactor temperature?"
```

**Agent Action:**
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

**Result:**
```
The reactor temperature is 87.3°C
```

---

## Skill Contents

### Core Documentation

- **[SKILL.md](SKILL.md)** (452 lines)
  - Complete skill documentation
  - 4 operation types (read, read_multiple, get_all_variables, browse)
  - 4 example workflows
  - Error handling guide
  - Best practices

### Quick Reference

- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** (188 lines)
  - One-page command reference
  - Common node IDs
  - Formatting guidelines
  - Quick tips

### Testing

- **[TEST_SCENARIO.md](TEST_SCENARIO.md)** (398 lines)
  - 6 comprehensive test cases
  - Expected agent behavior
  - Success criteria
  - Validation checklist

### Reference Documentation

- **[references/node_id_format.md](references/node_id_format.md)** (400 lines)
  - Complete OPC UA node ID syntax guide
  - 4 identifier types explained
  - Examples and best practices
  - Common mistakes to avoid

- **[references/common_nodes.md](references/common_nodes.md)** (330 lines)
  - Factory-specific node ID mappings
  - Reactor sensors
  - Production line motors
  - Cooling system
  - Alarm signals

### Helper Scripts

- **[scripts/read_node.py](scripts/read_node.py)** (90 lines)
  - Value formatting utility
  - Data type handling (Double, Int32, Boolean, String)
  - Unit-aware formatting

---

## Supported Operations

### 1. read
Read a single node value.

**When to use:** You know the exact node ID and need one value.

### 2. read_multiple
Read multiple node values in a single batch operation.

**When to use:** You need several values at once (more efficient than individual reads).

### 3. get_all_variables
Discover all available variables on the OPC UA server.

**When to use:** You don't know what sensors are available.

### 4. browse
Browse the node hierarchy starting from a specific node.

**When to use:** You want to explore the server structure.

---

## Example Workflows

### Workflow 1: Simple Sensor Read
**User:** "What's the reactor temperature?"

1. Agent loads opcua-read skill
2. Looks up node ID in common_nodes.md (ns=2;i=101)
3. Executes read command
4. Formats result: "87.3°C"

### Workflow 2: Monitor Multiple Motors
**User:** "Check all motor speeds on Production Line 1"

1. Agent uses read_multiple with motor node IDs
2. Formats results as table
3. Shows all 5 motors with speeds and status

### Workflow 3: Discovery
**User:** "Show me all temperature sensors"

1. Agent uses get_all_variables
2. Filters results by name pattern
3. Lists sensors with node IDs and current values

### Workflow 4: Exploration
**User:** "What nodes are under the Objects folder?"

1. Agent uses browse with nodeId: "i=85"
2. Shows child nodes with types
3. Provides node IDs for further browsing

---

## Key Features

### Node ID Format Support

**Numeric IDs** (most common):
```
ns=2;i=101     - Reactor Temperature
ns=2;i=302     - Motor 2 Speed
i=85           - ObjectsFolder (shorthand for ns=0;i=85)
```

**String IDs**:
```
ns=3;s=Temperature_Sensor_1
ns=2;s=Reactor/Temperature
ns=2;s=ProductionLine1.Motor1.Speed
```

### Smart Value Formatting

- **Temperature:** 1 decimal place (87.3°C)
- **Pressure:** 2 decimal places (2.45 bar)
- **RPM:** Whole numbers (1450 RPM)
- **Percentages:** Whole numbers (75%)
- **Flow Rates:** 1 decimal place (125.5 L/min)

### Error Handling

The skill provides clear guidance when errors occur:

- **Connector not found:** Suggests checking available connectors
- **Node not found:** Recommends using browse or get_all_variables
- **Bad status code:** Indicates sensor connection issue
- **Connection timeout:** Points to network/server problem

---

## Architecture Integration

### Skills-Based Approach

This skill is part of a **skills-based architecture** that keeps the React agent prompt stable while providing domain-specific capabilities:

```
Agent Query
    ↓
Load opcua-read skill
    ↓
Skill provides instructions
    ↓
Agent executes remote_tool_call
    ↓
ops-edge-app OPC UA connector handles I/O
    ↓
Result returned to agent
    ↓
Agent formats and presents to user
```

### Benefits

✅ **Stable React Prompt:** No OPC UA-specific content in core agent prompt
✅ **Self-Contained:** All knowledge in skill documentation
✅ **Easy to Update:** Modify skill without touching agent code
✅ **Domain Expert Friendly:** Skills can be written by OPC UA experts
✅ **Extensible:** Easy to add new skills (opcua-write, opcua-historian, etc.)

---

## Testing

See [TEST_SCENARIO.md](TEST_SCENARIO.md) for detailed test cases.

### Quick Validation

1. Load the skill in an agent session
2. Try: "What's the server time?" (should read ns=0;i=2259)
3. Try: "Show me all variables" (should use get_all_variables)
4. Verify results are properly formatted

### Expected Agent Behavior

- ✅ Loads skill successfully
- ✅ Uses correct command for each scenario
- ✅ Formats node IDs correctly
- ✅ Includes units in output
- ✅ Handles errors gracefully
- ✅ Prefers batch operations over individual reads

---

## Dependencies

### ops-edge-app Requirements

- OPC UA connector configured and running
- node-opcua library installed
- Valid OPC UA server endpoint

### Skill Requirements

- ops-edge-app skill connector enabled
- Agent access to skill directory (D:/ops-data/skills/)
- Python 3.x (for optional scripts)

---

## Usage Statistics

**Total Package Size:** ~1,858 lines of documentation and code

**File Breakdown:**
- SKILL.md: 452 lines
- QUICK_REFERENCE.md: 188 lines
- TEST_SCENARIO.md: 398 lines
- scripts/read_node.py: 90 lines
- references/common_nodes.md: 330 lines
- references/node_id_format.md: 400 lines

---

## Related Skills

- **opcua-write** (planned) - Control operations and setpoint writes
- **opcua-discovery** (planned) - Advanced node exploration
- **opcua-diagnostics** (planned) - Health monitoring and troubleshooting
- **opcua-historian** (planned) - Time-series analysis and trending

---

## Version History

### 1.0.0 (2026-01-14)
- Initial release
- Basic read operations (read, read_multiple)
- Discovery capabilities (get_all_variables, browse)
- Comprehensive documentation
- Test scenarios and quick reference

---

## Contributing

To improve this skill:

1. Update documentation in SKILL.md
2. Add new node mappings to common_nodes.md
3. Extend test cases in TEST_SCENARIO.md
4. Submit feedback to ops-edge-app team

---

## Support

**Documentation:** See SKILL.md for complete reference
**Quick Help:** See QUICK_REFERENCE.md for one-page guide
**Testing:** See TEST_SCENARIO.md for validation
**Node IDs:** See references/node_id_format.md for syntax

---

## License

MIT License - See skill metadata for details

---

**Last Updated:** 2026-01-14
**Maintained By:** ops-edge-app Team
**Status:** ✅ Production Ready (Pending Integration Testing)
