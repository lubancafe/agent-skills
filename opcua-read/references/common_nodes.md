# Common OPC UA Node IDs Reference

This document contains factory-specific node ID mappings for quick reference.

**Note:** Update this file based on your specific OPC UA server configuration.

---

## Standard OPC UA Server Nodes

| Description | Node ID | Data Type | Access |
|-------------|---------|-----------|--------|
| Server Status - Current Time | `ns=0;i=2259` | DateTime | Read |
| Server Status - State | `ns=0;i=2256` | Int32 | Read |
| Objects Folder (Root) | `i=85` | Object | Browse |

---

## Example Factory Configuration

### Reactor R-101

| Sensor | Node ID | Unit | Normal Range |
|--------|---------|------|--------------|
| Temperature | `ns=2;i=101` | °C | 80-95 |
| Pressure | `ns=2;i=102` | bar | 2.0-3.0 |
| Level | `ns=2;i=103` | % | 40-80 |
| Agitator Speed | `ns=2;i=104` | RPM | 100-200 |

### Production Line 1 - Motors

| Motor | Node ID | Normal Speed (RPM) |
|-------|---------|-------------------|
| Motor 1 | `ns=2;i=301` | 1400-1500 |
| Motor 2 | `ns=2;i=302` | 1400-1500 |
| Motor 3 | `ns=2;i=303` | 1400-1500 |
| Motor 4 | `ns=2;i=304` | 1400-1500 |
| Motor 5 | `ns=2;i=305` | 1400-1500 |

### Production Line 1 - Flow Rates

| Sensor | Node ID | Unit | Normal Range |
|--------|---------|------|--------------|
| Inlet Flow | `ns=2;i=401` | L/min | 100-150 |
| Outlet Flow | `ns=2;i=402` | L/min | 100-150 |
| Bypass Flow | `ns=2;i=403` | L/min | 0-50 |

### Cooling System

| Sensor | Node ID | Unit | Normal Range |
|--------|---------|------|--------------|
| Cooling Water Temp | `ns=2;i=201` | °C | 15-25 |
| Cooling Water Flow | `ns=2;i=202` | L/min | 200-300 |
| Chiller Status | `ns=2;i=203` | Boolean | true |

### Alarm System

| Alarm | Node ID | Type |
|-------|---------|------|
| High Temperature Alarm | `ns=2;i=501` | Boolean |
| High Pressure Alarm | `ns=2;i=502` | Boolean |
| Low Level Alarm | `ns=2;i=503` | Boolean |
| Motor Fault Alarm | `ns=2;i=504` | Boolean |
| Emergency Stop Status | `ns=2;i=505` | Boolean |

---

## Node ID Patterns

### Namespace Guidelines

- **ns=0**: Standard OPC UA server nodes
- **ns=1**: OPC UA companion specifications
- **ns=2**: Custom application nodes (sensors, actuators)
- **ns=3**: String-based identifiers

### Identifier Ranges (Example Convention)

- **1-100**: System status and diagnostics
- **101-200**: Reactor sensors and controls
- **201-300**: Cooling system
- **301-400**: Production Line 1 motors
- **401-500**: Production Line 1 flow sensors
- **501-600**: Alarm signals

---

## Quick Lookup by Category

### All Temperature Sensors
```
ns=2;i=101  - Reactor Temperature
ns=2;i=201  - Cooling Water Temperature
```

### All Pressure Sensors
```
ns=2;i=102  - Reactor Pressure
```

### All Motor Speeds
```
ns=2;i=301  - Motor 1 Speed
ns=2;i=302  - Motor 2 Speed
ns=2;i=303  - Motor 3 Speed
ns=2;i=304  - Motor 4 Speed
ns=2;i=305  - Motor 5 Speed
```

### All Flow Sensors
```
ns=2;i=401  - Inlet Flow
ns=2;i=402  - Outlet Flow
ns=2;i=403  - Bypass Flow
ns=2;i=202  - Cooling Water Flow
```

### All Alarms
```
ns=2;i=501  - High Temperature Alarm
ns=2;i=502  - High Pressure Alarm
ns=2;i=503  - Low Level Alarm
ns=2;i=504  - Motor Fault Alarm
ns=2;i=505  - Emergency Stop Status
```

---

## Usage Tips

### Finding Node IDs Dynamically

If a node ID is not listed here:

1. **Browse from root:**
   ```json
   {
     "command": "browse",
     "nodeId": "i=85"
   }
   ```

2. **Get all variables:**
   ```json
   {
     "command": "get_all_variables"
   }
   ```

3. **Search by name:**
   - Filter results from `get_all_variables` by name pattern

### Batch Read Examples

**Read all reactor sensors:**
```json
{
  "command": "read_multiple",
  "nodeIds": ["ns=2;i=101", "ns=2;i=102", "ns=2;i=103", "ns=2;i=104"]
}
```

**Read all alarms:**
```json
{
  "command": "read_multiple",
  "nodeIds": ["ns=2;i=501", "ns=2;i=502", "ns=2;i=503", "ns=2;i=504", "ns=2;i=505"]
}
```

---

## Updating This Document

When you discover new nodes:

1. Document the node ID, description, and data type
2. Add it to the appropriate category
3. Include normal operating ranges if applicable
4. Update the quick lookup sections

---

**Last Updated:** 2026-01-14
**OPC UA Server:** opc.tcp://192.168.1.100:4840
**Configuration Version:** 1.0
