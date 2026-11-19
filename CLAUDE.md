# Personal website: agent instructions

The full plan is `docs/website-plan.md`. It is the source of truth.

At the start of every session:
1. Read the "Start here" block at the top of the plan.
2. Read section 19 (build protocol), the status table in 19.4, and the latest entry in 19.5.
3. Take the next open work package in 19.3, or the one Justin names, and read only the sections it lists.

While working:
- Branch per package (`wp<NN>-<short-name>`); merge when "done when" is met and CI passes.
- Commit and update 19.4 after every finished sub-task.
- Tabs for indentation in all code except YAML; comments on their own line or short trailing; never column-aligned comments.
- All visible site text lives in `src/content/`; never invent facts; leave **[CONFIRM]** and **[ADD]** placeholders in place.
- Decisions in section 0 of the plan change only with Justin's approval.

Before stopping:
- Commit everything, update the package's row in 19.4, and add a session log entry in 19.5.
- Put questions for Justin in 19.6.
