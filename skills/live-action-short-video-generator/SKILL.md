---
name: live-action-short-video-generator
description: Create production-ready plans and MiniMax H3 Ref2VA prompt packages for 3–5 minute live-action narrative short videos. Use when a user has a film idea or existing screenplay and needs script development, screenplay feasibility review, asset bibles, scene and shot breakdowns, continuity planning, per-shot full-reference prompts, generation logs, pilot validation, post-production planning, or troubleshooting for character, voice, action, and audio consistency. Do not treat the task as one long-video prompt: decompose it into 4–15 second generation units and assemble the finished film in post.
---

# Live-Action Short Video Generator

Use this skill to turn an idea or screenplay into a manageable live-action short-video production package for MiniMax H3 Ref2VA. Produce Chinese project-management documents and English structured H3 Prompt sections; preserve user-supplied dialogue, lyrics, and visible text in the original language.

## Read Bundled References

Read these files from this skill directory, never from the project root or an external URL:

1. `references/真人短视频创作指南.md` — complete 3–5 minute production workflow, templates, continuity, audio, post, and QA.
2. `references/VIDEO_PROMPT_WRITING_GUIDE_ref_en.md` — authoritative Ref2VA six-section format, label roles, retention markers, and dialogue rules.
3. `references/MiniMax-H3-prompting.md` — compact mode selection and final compliance rules.

Always read the first reference. Read the Ref2VA specification before writing or reviewing a structured Prompt, and read the compact rules when checking limits or deciding whether a reference is a frame, subject, source video, or audio source.

## Non-Negotiable Constraints

- Treat the 3–5 minute film as a sequence of independent 4–15 second H3 generation units, not one Prompt.
- Keep each Prompt under 7000 characters and each generation duration within 4–15 seconds.
- Ref2VA input limits are at most 9 images, 3 videos, and 3 audio clips per request; video/audio totals are each at most 15 seconds, and mixed files total at most 12. Audio cannot be the sole input.
- Keep model name, resolution, aspect ratio, and API settings outside the structured Prompt body.
- Never mix Base I2VA/FL2VA/L2VA alignment instructions with the Ref2VA six-section schema.
- Use exact field order: `subject_definitions`, `summary`, `retention_analysis`, `detailed_description`, `overall_soundscape`, `non_diegetic_music`.
- Keep all structural Prompt prose and labels in English. Put exact user dialogue/lyrics only inside `<d>[Language] ...</d>` and visible scene text in English double quotes.
- Do not invent an `<Audio N>` merely because a reference video contains sound. Define audio only when a signal is copied or referenced.
- Obtain authorization for real-person likeness, voice, music, brands, and other protected material before production.

## Decide the Task Path

### A. User has only an idea

1. Extract target audience, genre, tone, duration, format, characters, locations, conflict, ending, required dialogue/text, exclusions, and available assets.
2. If the idea is underspecified, propose three materially different story directions with a one-line premise, character goal, obstacle, turning point, ending, and H3 production risks.
3. After a direction is chosen, create a beat sheet, scene list, time budget, and asset-risk list. Do not write H3 Prompts yet.
4. Write and time the screenplay, then lock the story before asset production.

### B. User already has a screenplay

1. Audit actual read-through duration against 3–5 minutes.
2. Preserve the story's core characters, conflict, turning points, ending, and user-provided dialogue unless the user approves changes.
3. Flag overlong dialogue, uncontrolled locations/cast, complex physical interactions, mass action, and continuity hazards.
4. Convert the screenplay into a scene table with purpose, entry state, exit state, duration, characters, props, sound, and risk.
5. Ask for confirmation only when a proposed simplification changes story meaning; otherwise apply conservative production simplifications.

## Build the Project Package

When the user asks for a full project package, create a project folder under `<project-root>/<编号-中文项目名>/` with:

```text
00-项目管理/创作简报.md
00-项目管理/制作计划.md
00-项目管理/连续性总表.md
01-剧本/故事大纲.md
01-剧本/场景剧本.md
01-剧本/锁定剧本.md
02-资产圣经/角色圣经.md
02-资产圣经/场景圣经.md
02-资产圣经/服装道具圣经.md
02-资产圣经/视觉风格圣经.md
02-资产圣经/声音圣经.md
03-参考素材/人物/
03-参考素材/场景/
03-参考素材/服装道具/
03-参考素材/动作运镜/
03-参考素材/声音/
04-分镜与镜头表/场景表.md
04-分镜与镜头表/镜头表.md
05-H3提示词/场01/
06-生成原片/场01/
07-批准素材/
08-后期工程/剪辑/
08-后期工程/音频/
08-后期工程/字幕/
09-交付/
生成记录.csv
```

Use objective names such as `场01_镜003_版本02_批准.mp4`; do not use ambiguous `最终版2` filenames. Keep project IDs (`角色01`, `场景02`, `道具03`) separate from Prompt-local `<Subject N>` and `(Sx)` labels.

## Asset Bible Rules

- Define each important character's face, hair, body proportions, costume version, accessories, normal expression, voice, and prohibited changes.
- Prepare a clear identity set: face close-up, three-quarter or half-body view, current costume, and any special makeup or injury state. Upload only the 1–5 assets relevant to the current shot; do not upload conflicting references.
- Define stable scene layout, entrances, windows, furniture, props, lighting direction, color temperature, time, weather, and permitted camera positions.
- Track costume and prop state per scene: wet/dry, open/closed, held hand, damage, blood, dirt, and continuity change point.
- Use short clean voice samples of 2–15 seconds with no music or overlapping speakers. Distinguish audio `fully_copy`, `partially_copy`, and `reference`.
- Use action/camera reference clips only for a clear role. Visible action reused from a video belongs in `<Subject N>`; `<Video N>` is for whole-video editing, continuation, or temporal structure.
- Reuse approved frames as concrete continuity anchors, but periodically re-anchor to master character and scene references to prevent drift.

## Shot Breakdown

Separate scene, editorial shot, and generation unit. For live-action narrative work, prefer one main shot per generation unit. Each unit should normally contain one narrative purpose, one primary action/state change, one emotion change, one primary camera move, and one natural dialogue span.

Use 4–6 seconds for reactions/inserts, 6–9 for a sentence or simple action, 9–12 for a continuous performance, and 12–15 only for one uncomplicated long action. Reserve stable head and tail states when possible so the editor has roughly 0.5–1 second of usable handle.

For every shot record:

```text
shot_id, scene, final_duration, generation_duration,
narrative_purpose, start_state, end_state, shot_size/composition,
subjects/positions, environment/lighting, action_chain,
camera_move, dialogue, synchronized_sound, references,
continuity_constraints, edit_in, edit_out, status
```

Check eyelines, screen direction, prop hand, costume state, wetness/injury, lighting, emotional progression, and the previous/next pose. If an interaction is physically unstable, split it into reaction → insert → result instead of forcing one complex generation.

Before the full batch, create a 30–60 second pilot containing the hardest close dialogue, a two-person interaction, an action/prop shot, and a continuity cut. Lock the character, voice, scene, and camera method only after the pilot passes.

## Write a Ref2VA Prompt Package

For each generation unit, keep generation settings and upload mapping outside the Prompt, then write the six sections below in exact order:

```text
subject_definitions:
...

summary:
...

retention_analysis:
...

detailed_description:
...

overall_soundscape:
...

non_diegetic_music:
...
```

### Reference labels

- `<Subject N>`: reusable visible person, object, environment, costume, action, pose, expression, or effect.
- `<Picture N>`: a concrete first frame, keyframe, last frame, composition anchor, or storyboard reference. Do not create a standalone Picture when the image only supplies a subject.
- `<Video N>`: whole-video source for editing, continuation, camera movement, cuts, rhythm, or temporal structure. Visible content taken from it still needs a Subject label.
- `<Audio N>`: copied or referenced audio signal, voice timbre, dialogue/lyrics, music, beat, or sound texture. Video and Audio labels are independently numbered.

Keep each label's meaning identical across all six sections. Do not introduce new labels in `summary`. For a referenced subject who physically speaks, write `<Subject N> (Sx)`; assign `(Sx)` by first actual vocal event in the current target clip and reuse it within that clip. Do not write speaker IDs in `retention_analysis`.

### Section rules

1. `subject_definitions`: one line per separately tracked subject, frame, source video, or audio role. State source asset and concrete features.
2. `summary`: one short paragraph beginning with fixed task types such as `[reference generation + keyframe completion + audio reference]`. Use `video editing` or `video continuation` only when the source video is actually edited or continued.
3. `retention_analysis`: one line per defined label. Visible markers are `fully_preserved`, `partially_preserved`, `attribute_transfer`, `weak_reference`; audio markers are `fully_copy`, `partially_copy`, `reference`, `weak_reference`.
4. `detailed_description`: establish style before `[Shot 1]`; describe composition, subject position, environment, lighting, action/state changes, camera, synchronized sound, dialogue, and the exact points where references apply. Generation descriptions normally target 350–500 English words, but prioritize a complete timeline over word count.
5. `overall_soundscape`: 1–4 English sentences for ambience, physical action sounds, and non-verbal human sounds. Do not repeat dialogue or diegetic music.
6. `non_diegetic_music`: 1–3 English sentences for audience-only score through instrumentation, tempo/rhythm, and dynamic development; use `N/A` when no such score is wanted.

Use natural camera language such as `push in`, `pull out`, `pan`, `truck`, `tilt`, `pedestal`, `arc shot`, `tracking shot`, or `static shot`, optionally with `with small/large amplitude` and `at slow/fast speed`. Do not stack camera labels.

For dialogue:

- Put only the original words and language tag inside `<d>`.
- Use `says in an off-screen voiceover` and state that on-screen lips remain completely closed for voiceover.
- Use `<scenetrans>` at both ends when a line crosses a cut, and explicitly state that audio continues across the cut.
- Use `<cutoff>` when the video ending truncates speech.
- Put visible signs, subtitles, labels, and UI text in English double quotes and preserve exact wording.

Do not add Base keyframe alignment lines to a Ref2VA Prompt. If an approved previous frame is the exact opening or ending anchor, define it as `<Picture N>` and state `the shot begins from <Picture N>` or `the shot ends on <Picture N>` in `detailed_description`.

## Long-Form Audio and Post

Recommend locking dialogue timing before final generation. For 3–5 minute narrative work, use `non_diegetic_music: N/A` for most clips and add a continuous score in post; independent BGM per clip usually restarts its tone and rhythm at every cut. Keep room tone and environmental beds continuous across edits. Generate subtitles, titles, logos, and dense readable text in post whenever possible.

After approved clips exist, guide the user through rough cut, missing insert/reaction shots, picture lock, optional high-resolution regeneration, color matching, dialogue cleanup, ambience, music, subtitles, rights review, and final delivery. Do not spend high-cost finishing work on candidates before picture lock.

## Generation Logs and QA

Maintain `生成记录.csv` with shot ID, version, date, duration, Prompt path, uploaded references, identity, action, composition, lip sync, voice, sound, continuity, verdict, defect, and next change. Change one major variable per retry.

Reject or repair clips with identity drift, outfit/prop changes, broken hands or teeth, impossible physics, discontinuous eyelines, incorrect dialogue, unstable lip sync, bad text, audio resets, or no usable edit handle. Salvage with early cuts, inserts, J-cuts/L-cuts, environmental bridges, reframing, and sound masking before regenerating an entire sequence.

Before delivery, verify story length, hook, scene purpose, continuity, dialogue fidelity, audio transitions, subtitles, frame/audio specifications, rights, and archive completeness. Preserve a clean master, subtitle version, project file, Prompt files, reference mapping, and generation log.

## Response Contract

When the user asks for a full project, deliver or create the project documents in stages and identify the current gate: creative brief, screenplay, asset bible, shot list, pilot, generation batch, rough cut, or delivery. Do not silently change a locked story element.

When the user asks for one shot, return a self-contained Prompt package with generation settings, upload mapping, and the exact six-field English Ref2VA Prompt. Keep management notes in Chinese and dialogue/text in the original language.

When required information is missing, ask only for information that changes the story, asset role, duration, dialogue, or production path. Make conservative assumptions for cosmetic details and record them in the project documents.
