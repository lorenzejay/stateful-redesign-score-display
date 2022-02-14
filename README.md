TASK: Redesign how score is shown on the web app - ex) https://app.stateful.com/@lorenzejay

# Original

<img src='/public/score-original.png' />

# Redesign

1. Change pill like border-radius to more subtle border radius to compliment other component border radius.
2. Instead of clicking the number, use hover (onMouseEnter/onMouseLeave) to display stats.
   - why?
     - I see it as an interaction vs an action. We are not being redirected to another page instead are "interacting" with our guage or compass to see our stats.
     - The score by itself doesn't indicate our performance from first glance. It can possibly represent other things. Consistency in terms of seeing the guage from VS code to now on the web app will make that clear that the guage represents your stats.

<img src='/public/score-redesign.png' />
<img src='/public/score-redesign-hover.png' />

# Run

1. git clone
2. npm install
3. npm run dev => visible on http://localhost:3000/
