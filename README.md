# Skills Repository

This directory contains modular, self-contained skills that extend Claude's capabilities with specialized knowledge, workflows, and tools. Skills transform Claude from a general-purpose agent into a specialized agent equipped with domain-specific procedural knowledge.

## What Are Skills?

Skills are "onboarding guides" for specific domains or tasks. Each skill packages together:

- **Specialized workflows** - Multi-step procedures for specific domains
- **Tool integrations** - Instructions for working with specific file formats or APIs
- **Domain expertise** - Company-specific knowledge, schemas, business logic
- **Bundled resources** - Scripts, references, and assets for complex and repetitive tasks

## Available Skills

### [xlsx](xlsx/)
Comprehensive spreadsheet creation, editing, and analysis with support for formulas, formatting, data analysis, and visualization. Use for working with Excel files (.xlsx, .xlsm, .csv, .tsv).

**Key features:**
- Data analysis scripts (CSV analysis, charts, pivot tables)
- Formula recalculation with LibreOffice
- Financial modeling standards and best practices
- Pre-built Python scripts for common operations

### [skill-creator](skill-creator/)
Guide for creating effective skills that extend Claude's capabilities. Use when building new skills or improving existing ones.

**Key features:**
- Skill creation workflow and best practices
- Progressive disclosure design patterns
- Resource organization guidelines (scripts, references, assets)
- Validation and packaging tools

## Skill Structure

Each skill follows a standardized structure:

```
skill-name/
├── SKILL.md           # Required: Metadata and instructions
├── LICENSE.txt        # License information
├── scripts/           # Optional: Executable code (Python/Bash/etc.)
├── references/        # Optional: Documentation loaded as needed
└── assets/            # Optional: Templates, images, fonts, etc.
```

### SKILL.md Format

Every skill has a SKILL.md file with:

1. **YAML frontmatter** - Metadata that determines when the skill triggers:
   ```yaml
   ---
   name: skill-name
   description: What the skill does and when to use it
   license: License information
   ---
   ```

2. **Markdown body** - Instructions loaded after skill triggers

### Resource Types

- **scripts/** - Executable code for deterministic, repeatedly-needed operations
- **references/** - Documentation loaded into context when needed
- **assets/** - Files used in output (templates, boilerplate, images, fonts)

## Using Skills

Skills automatically activate when Claude detects relevant tasks based on the skill's description. The activation uses a three-level loading system:

1. **Metadata (name + description)** - Always in context
2. **SKILL.md body** - Loaded when skill triggers
3. **Bundled resources** - Loaded or executed as needed

## Creating New Skills

To create a new skill, follow the workflow documented in [skill-creator](skill-creator/):

1. **Understand** - Gather concrete examples of skill usage
2. **Plan** - Identify reusable scripts, references, and assets
3. **Initialize** - Run `init_skill.py` to create skill template
4. **Edit** - Implement resources and write SKILL.md
5. **Package** - Run `package_skill.py` to create distributable .skill file
6. **Iterate** - Test and improve based on real usage

## Best Practices

### Keep Skills Concise
The context window is shared between all skills, conversation history, and user requests. Only include information Claude truly needs.

### Use Progressive Disclosure
Split large skills into SKILL.md (core workflow) and reference files (detailed documentation). Claude loads references only when needed.

### Set Appropriate Freedom Levels
- **High freedom** (text instructions) - Multiple valid approaches
- **Medium freedom** (scripts with parameters) - Preferred patterns with variation
- **Low freedom** (specific scripts) - Fragile operations requiring consistency

### Avoid Duplication
Don't create README.md, CHANGELOG.md, or other auxiliary documentation. Skills should only contain information needed for the AI agent to execute tasks.

## Repository Organization

This repository uses Git for version control:

```bash
# View skill history
cd skills/<skill-name>
git log

# Check skill status
git status
```

## License

Each skill contains its own LICENSE.txt file. Refer to individual skill directories for specific licensing terms.

## Further Reading

- [skill-creator/SKILL.md](skill-creator/SKILL.md) - Comprehensive guide for creating effective skills
- [skill-creator/references/workflows.md](skill-creator/references/workflows.md) - Patterns for sequential workflows
- [skill-creator/references/output-patterns.md](skill-creator/references/output-patterns.md) - Template and example patterns
- [xlsx/SKILL.md](xlsx/SKILL.md) - Example of a comprehensive skill implementation
