# opcua-read Skill - Test Scenario

## Test Environment

**Prerequisites:**
- ops-edge-app running with OPC UA connector configured
- OPC UA server accessible (e.g., `opc.tcp://192.168.1.100:4840`)
- Connector ID available (e.g., `factory-opcua`)

---

## Test 1: Simple Read Operation

### User Query
```
"What's the current reactor temperature?"
```

### Expected Agent Behavior

1. **Load Skill**
   - Agent should load `opcua-read` skill
   - SKILL.md instructions appear in context

2. **Generate Tool Call**
   ```json
   {
     "action": "remote_tool_call",
     "target": "opcua",
     "params": {
       "agent_id": "local-dev",
       "connector_id": "factory-opcua",
       "command": "read",
       "nodeId": "ns=2;i=101"
     }
   }
   ```

3. **Expected Response**
   ```json
   {
     "value": 87.3,
     "dataType": "Double",
     "statusCode": "Good",
     "timestamp": "2026-01-14T10:30:00Z"
   }
   ```

4. **Agent Output**
   ```
   The reactor temperature is 87.3°C (as of 10:30:00 AM)
   ```

**Success Criteria:**
- ✅ Skill loads without errors
- ✅ Correct node ID used (`ns=2;i=101` from common_nodes.md)
- ✅ Tool call has correct structure
- ✅ Response is properly formatted with unit

---

## Test 2: Multiple Read Operation (Batch)

### User Query
```
"Check all motor speeds on Production Line 1"
```

### Expected Agent Behavior

1. **Load Skill** (if not already loaded)

2. **Generate Tool Call**
   ```json
   {
     "action": "remote_tool_call",
     "target": "opcua",
     "params": {
       "agent_id": "local-dev",
       "connector_id": "factory-opcua",
       "command": "read_multiple",
       "nodeIds": [
         "ns=2;i=301",
         "ns=2;i=302",
         "ns=2;i=303",
         "ns=2;i=304",
         "ns=2;i=305"
       ]
     }
   }
   ```

3. **Expected Response**
   ```json
   {
     "ns=2;i=301": {
       "value": 1450,
       "timestamp": "2026-01-14T10:30:00Z",
       "statusCode": "Good"
     },
     "ns=2;i=302": {
       "value": 1445,
       "timestamp": "2026-01-14T10:30:00Z",
       "statusCode": "Good"
     },
     "ns=2;i=303": {
       "value": 1460,
       "timestamp": "2026-01-14T10:30:00Z",
       "statusCode": "Good"
     },
     "ns=2;i=304": {
       "value": 1455,
       "timestamp": "2026-01-14T10:30:00Z",
       "statusCode": "Good"
     },
     "ns=2;i=305": {
       "value": 1440,
       "timestamp": "2026-01-14T10:30:00Z",
       "statusCode": "Good"
     }
   }
   ```

4. **Agent Output** (formatted as table)
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

**Success Criteria:**
- ✅ Uses `read_multiple` command (not individual reads)
- ✅ All 5 motor node IDs included
- ✅ Response formatted as table
- ✅ Values shown with RPM unit

---

## Test 3: Discovery Operation

### User Query
```
"Show me all temperature sensors in the system"
```

### Expected Agent Behavior

1. **Load Skill** (if not already loaded)

2. **Generate Tool Call**
   ```json
   {
     "action": "remote_tool_call",
     "target": "opcua",
     "params": {
       "agent_id": "local-dev",
       "connector_id": "factory-opcua",
       "command": "get_all_variables"
     }
   }
   ```

3. **Expected Response** (excerpt)
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
     },
     {
       "name": "Level",
       "nodeId": "ns=2;i=103",
       "value": 65.0,
       "dataType": "Double"
     },
     {
       "name": "CoolingWaterTemp",
       "nodeId": "ns=2;i=201",
       "value": 22.5,
       "dataType": "Double"
     }
   ]
   ```

4. **Agent Processing**
   - Filter results where name contains "Temp" or "Temperature"

5. **Agent Output**
   ```
   Temperature Sensors Found:
   1. Reactor Temperature (ns=2;i=101) - Current: 87.3°C
   2. Cooling Water Temp (ns=2;i=201) - Current: 22.5°C
   ```

**Success Criteria:**
- ✅ Uses `get_all_variables` command
- ✅ Filters results by name pattern
- ✅ Shows node IDs for reference
- ✅ Includes current values with units

---

## Test 4: Browse Operation

### User Query
```
"What nodes are under the Objects folder?"
```

### Expected Agent Behavior

1. **Load Skill** (if not already loaded)

2. **Generate Tool Call**
   ```json
   {
     "action": "remote_tool_call",
     "target": "opcua",
     "params": {
       "agent_id": "local-dev",
       "connector_id": "factory-opcua",
       "command": "browse",
       "nodeId": "i=85"
     }
   }
   ```

3. **Expected Response**
   ```json
   [
     {
       "nodeId": "ns=2;i=100",
       "browseName": "Sensors",
       "nodeClass": "Object",
       "displayName": "Sensor Group"
     },
     {
       "nodeId": "ns=2;i=200",
       "browseName": "Actuators",
       "nodeClass": "Object",
       "displayName": "Actuator Group"
     }
   ]
   ```

4. **Agent Output**
   ```
   Nodes under Objects Folder:

   1. Sensors (ns=2;i=100) - Object
      Display Name: Sensor Group

   2. Actuators (ns=2;i=200) - Object
      Display Name: Actuator Group
   ```

**Success Criteria:**
- ✅ Uses correct root node ID (`i=85`)
- ✅ Shows node hierarchy
- ✅ Includes node IDs for further browsing

---

## Test 5: Error Handling

### User Query
```
"Read temperature from ns=2;i=999"
```

### Expected Agent Behavior

1. **Generate Tool Call**
   ```json
   {
     "action": "remote_tool_call",
     "target": "opcua",
     "params": {
       "agent_id": "local-dev",
       "connector_id": "factory-opcua",
       "command": "read",
       "nodeId": "ns=2;i=999"
     }
   }
   ```

2. **Expected Error Response**
   ```json
   {
     "error": "Node not found",
     "statusCode": "BadNodeIdUnknown"
   }
   ```

3. **Agent Output**
   ```
   I couldn't read the node ns=2;i=999 because it doesn't exist on the OPC UA server.

   Would you like me to:
   1. Browse the available nodes to find the correct one?
   2. Show all temperature-related variables?
   ```

**Success Criteria:**
- ✅ Handles error gracefully
- ✅ Explains the problem clearly
- ✅ Offers helpful next steps

---

## Test 6: Node ID Format Validation

### User Query
```
"What's the difference between ns=2;i=101 and ns=2;s=Temperature?"
```

### Expected Agent Behavior

1. **Agent uses reference knowledge** (from node_id_format.md)

2. **Agent Output**
   ```
   These are two different ways to identify OPC UA nodes:

   1. **ns=2;i=101** (Numeric Identifier)
      - More efficient and compact
      - Common in standard implementations
      - Faster server lookups

   2. **ns=2;s=Temperature** (String Identifier)
      - Human-readable
      - Self-documenting
      - Common in custom implementations

   Both can refer to the same physical sensor, depending on how the server configured
   the node IDs. You can use browse or get_all_variables to see which format your
   server uses.
   ```

**Success Criteria:**
- ✅ Agent references node_id_format.md correctly
- ✅ Explains both formats clearly
- ✅ Provides practical guidance

---

## Validation Checklist

After running all tests, verify:

- [ ] Skill loads successfully via skill connector
- [ ] All 4 commands work (read, read_multiple, get_all_variables, browse)
- [ ] Node IDs are correctly formatted in tool calls
- [ ] Responses are properly parsed and presented
- [ ] Units are included where appropriate (°C, RPM, bar, etc.)
- [ ] Errors are handled gracefully
- [ ] Reference docs are accessible and used correctly
- [ ] Agent doesn't hallucinate node IDs (uses common_nodes.md)
- [ ] Batch operations preferred over individual reads
- [ ] Table formatting works for multiple values

---

## Next Steps After Testing

If tests pass:
1. Mark Phase 2.3 complete in edge-opcua-design-v2.md
2. Consider implementing opcua-write skill (Phase 2.4)
3. Gather user feedback for improvements

If tests fail:
1. Document specific failures
2. Update SKILL.md to clarify instructions
3. Add more examples to address gaps
4. Re-test

---

**Test Date:** 2026-01-14
**Skill Version:** 1.0.0
**Tester:** Claude Code Agent
