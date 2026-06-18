export const GREETING_PART_ONE = `Hey 👋

You probably didn't come here to read another boring resume.

I'm Rishabh.

Give me 60 seconds and I'll show you why brands across APAC trusted me with millions of customer interactions.`;

export const GREETING_PART_TWO =
  "Or if you're in a hurry, click wherever you want.";

export type GreetingAction =
  | 'wins'
  | 'built'
  | 'hire'
  | 'marketer'
  | 'talk';

export const GREETING_RESPONSES: { id: GreetingAction; label: string }[] = [
  { id: 'wins', label: 'Show me the wins' },
  { id: 'built', label: 'What have you built?' },
  { id: 'hire', label: 'Why should I hire you?' },
  { id: 'marketer', label: 'How do you think as a marketer?' },
  { id: 'talk', label: "Let's talk" },
];

export const MARKETER_SIMULATOR_SPEECH = `Most marketers celebrate when a campaign launches.

I start asking questions.

What happens if CAC increases by 20%?

What if retention drops next month?

What if we're buying growth that's actually destroying profit?

This sandbox is how I pressure-test marketing decisions before real money gets spent.`;
