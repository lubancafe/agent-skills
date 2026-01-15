# opcua-read Skill - Quick Reference

## Skill Loading

```json
{
  "action": "skill_load",
  "skill_name": "opcua-read"
}
```

---

## Commands

### 1. Read Single Node

```json
{
  "action": "remote_tool_call",
  "target": "opcua",
  "params": {
    "agent_id": "local-dev",
    "connector_id": "<connector-id>",
    "command": "read",
    "nodeId": "ns=2;i=101"
  }
}
```

**Use when:** You know the exact node ID and need one value

---

### 2. Read Multiple Nodes (Batch)

```json
{
  "action": "remote_tool_call",
  "target": "opcua",
  "params": {
    "agent_id": "local-dev",
    "connector_id": "<connector-id>",
    "command": "read_multiple",
    "nodeIds": ["ns=2;i=101", "ns=2;i=102", "ns=2;i=103"]
  }
}
```

**Use when:** You need several values at once (more efficient)

---

### 3. Get All Variables

```json
{
  "action": "remote_tool_call",
  "target": "opcua",
  "params": {
    "agent_id": "local-dev",
    "connector_id": "<connector-id>",
    "command": "get_all_variables"
  }
}
```

**Use when:** You don't know what sensors are available

---

### 4. Browse Node Hierarchy

```json
{
  "action": "remote_tool_call",
  "target": "opcua",
  "params": {
    "agent_id": "local-dev",
    "connector_id": "<connector-id>",
    "command": "browse",
    "nodeId": "i=85"
  }
}
```

**Use when:** You want to explore the node tree structure

**Note:** `i=85` = ObjectsFolder (root)

---

## Common Node IDs (Factory Example)

### Reactor R-101
- Temperature: `ns=2;i=101` (°C)
- Pressure: `ns=2;i=102` (bar)
- Level: `ns=2;i=103` (%)
- Agitator Speed: `ns=2;i=104` (RPM)

### Production Line 1 - Motors
- Motor 1: `ns=2;i=301` (RPM)
- Motor 2: `ns=2;i=302` (RPM)
- Motor 3: `ns=2;i=303` (RPM)
- Motor 4: `ns=2;i=304` (RPM)
- Motor 5: `ns=2;i=305` (RPM)

### Cooling System
- Cooling Water Temp: `ns=2;i=201` (°C)
- Cooling Water Flow: `ns=2;i=202` (L/min)
- Chiller Status: `ns=2;i=203` (Boolean)

### Alarms
- High Temperature: `ns=2;i=501` (Boolean)
- High Pressure: `ns=2;i=502` (Boolean)
- Low Level: `ns=2;i=503` (Boolean)
- Motor Fault: `ns=2;i=504` (Boolean)
- Emergency Stop: `ns=2;i=505` (Boolean)

---

## Node ID Format

### Numeric (Most Common)
```
ns=<namespace>;i=<number>

Examples:
ns=0;i=2259  - Server time
ns=2;i=101   - Custom node
i=85         - ObjectsFolder (shorthand for ns=0;i=85)
```

### String
```
ns=<namespace>;s=<identifier>

Examples:
ns=3;s=Temperature_Sensor_1
ns=2;s=Reactor/Temperature
ns=2;s=ProductionLine1.Motor1.Speed
```

---

## Formatting Guidelines

### Temperature
- Format: 1 decimal place
- Example: `87.3°C`

### Pressure
- Format: 2 decimal places
- Example: `2.45 bar`

### RPM
- Format: Whole numbers
- Example: `1450 RPM`

### Percentages
- Format: Whole numbers
- Example: `75%`

### Flow Rates
- Format: 1 decimal place
- Example: `125.5 L/min`

---

## Tips

1. **Use Batch Reads**: Always prefer `read_multiple` over individual `read` calls
2. **Discovery First**: If you don't know node IDs, use `get_all_variables` or `browse`
3. **Check Status**: Always verify `statusCode: "Good"` before trusting the value
4. **Cache Node IDs**: Save discovered node IDs for future reference
5. **Format Appropriately**: Use the formatting guidelines above for consistent output

---

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| Connector not found | Invalid connector_id | Check available connectors |
| Node not found | Invalid nodeId | Use browse/get_all_variables |
| Bad status code | Value unavailable | Check sensor connection |
| Connection timeout | Server unreachable | Verify network/server |

---

## Example Workflows

### "What's the reactor temperature?"
1. Use `read` with `nodeId: "ns=2;i=101"`
2. Format: "87.3°C"

### "Check all motors"
1. Use `read_multiple` with motor node IDs
2. Present as table

### "Find temperature sensors"
1. Use `get_all_variables`
2. Filter by name pattern
3. List with node IDs

---

**Version:** 1.0.0
**Last Updated:** 2026-01-14

For complete documentation, see [SKILL.md](SKILL.md)
