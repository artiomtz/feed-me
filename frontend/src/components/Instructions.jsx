import React from "react";

export default function Instructions() {
  return (
    <>
      <p className="instructions">
        Hey there, chef!
        <br />
        So, you're wondering what culinary masterpieces you can whip up from the
        treasures hidden in your fridge? Well, you've come to the right place.
        The more ingredients you've got, the more delicious concoctions we can
        create. Just remember, even a kitchen wizard needs their trusty
        sidekicks, such as salt and pepper! Let's keep it exciting with a range
        of {MIN_INGREDIENTS} to {MAX_INGREDIENTS} ingredients. Ready to embark
        on a flavor-packed adventure? Let's get cooking!
      </p>
    </>
  );
}
