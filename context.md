# Ekta & Ajay Wedding Invitation — Build Prompts

All prompts given to customise this wedding invitation website, in chronological order (earliest at top, latest at bottom).

---

## Session 1 — Aug 2 (76f84008)

1. How to run this project.

2. This is a design that I want for my website — create the figma design of this website according to that only.

3. The image I have added in the images folder inside the public folder. The layout should be both mobile and laptop responsive one.

4. Why the image is not loading over here.

5. `public/images/97B5409E-A62A-4A02-A0B3-7D6D8DFE2BB8.png` — this is the image of the logo regarding the couple name initials. Use this in the invitation and remove the "E&A" text things from the invitation.

6. Why this initials logo is coming in the left top corner — it should be in the center and the size should also be a bit large, this is very small and not looking nice.

7. This initial logo and the center photo both should be self adjustable according to the UI layout. Also add some gap between the initial one and the "the wedding..." text — it is merging into each other. One more update: for the countdown, make it like a scratch card so when the user clicks or hovers mouse on it the scratch effect should work and then the count should be visible.

8. The initials logo is still not correct — it is small. It should be like a page that first the logo page appears and when you scroll down the other parts appear.

9. `public/images/ea-logo.png` — this is the updated UI for the events. Update the UI and make it like swiping pages for these event pages.

10. The events you created are a horizontal swipe. Make it like a vertical swipe feature.

11. `public/images/IMG_1204.jpeg`, `IMG_1205.jpeg`, `IMG_1206.jpeg`, `IMG_1207.jpeg`, `IMG_1208.jpeg`, `IMG_1209.jpeg`, `IMG_1210.jpeg` — these are the UI samples according to the different sections of the invitation. Modify the complete site according to these new updates. Where you require an image, use `public/images/couple.jpg`.

12. Fix the error in line 215 `src/components/InvitationMessage.astro`.

13. For now remove the ea-logo from the UI.

14. Can you make this project like the scrolling functionality of the Instagram website — make the whole website and all the sections as a swiping functionality so that it looks more interactive and nice. Also the current colour and figma is very dark — for the figma use the beige one only that we had previously and keep the UI similar to this one, just the theme change to beige.

15. Perfect.

16. Yes, for the current the swiping feature is only working for the first page. Now break the complete invitation website into different pages and apply swiping functionality on all the pages. Pages will be: starting page, then the wedding date page, then the picture and countdown, then event pages — all 4 different pages (note: for the events remove the vertical swiping that is currently there).

---

## Session 2 — Aug 2 (ba2fd30d)

17. Sorry the session suddenly closed by mistake. Continue and run the updated project.

18. Check, analyse and tell — can we have a curtain animation in the starting page "Hero" where first a closed curtain will be there and in the center the `public/images/ea-logo.png` logo will be there in circle-crop type, and then on click the curtain open animation will work and the Hero page will come up, then the regular swipe functionality will work.

19. Implement this plan now.

20. For the curtains part make the curtains like `public/images/Curtain.png` — the colour of the curtains. For now remove the logo on the curtains, just keep the curtain and make the curtain opening transition as 2 seconds so that it opens slowly and looks more nice. Once the curtains are opened then add one more page before the Hero page — name it CoupleLogo.

21. For logo use `public/images/LOGO.png`.

22. For the CoupleLogo page use `public/images/WeddingBackground.png`.

23. Few fixes needed — plan implementation for all of them properly:
    - In the invitation message page, the message and date part is not at proper center — there is still a blank space below in phone layout view. Fix that. After the scratch, a proper animation should also be there only around and on the scratch card, not on the complete page.
    - In the countdown page fix the alignment and spacing.

24. Plan more about adding a song to this website, and also after the Hero page on the top bar "E&A" is coming — replace that E&A with the logo `public/images/IMG_1210.jpeg`.

25. Use `LOGO.png` and `weddingsong.mp3`.

26. Remove the button — keep the song play only, and if the song is completed then replay should be done again.

27. Where do I have to add the mp3 file?

28. Done — added.

29. Resolve this (error).

30. What is the current time for the curtain open part?

31. Make it 3 seconds.

32. And what is the timing for the logo image to be visible?

33. Make it 3 seconds load so it will be better for user experience. Also once the user clicks on the curtain to open, the audio should start.

34. Add this 3-second load feature to other contents of all other pages as well.

35. Remove the RSVP and the "updates from us" page — it is not needed.

36. Now help to host this project so that everyone can view this on their phones as well.

37. One fix is left — in the upper bar the RSVP and updates point is still coming although the pages are already removed.

38. Done — for now stop the server, will continue the work later.

---

## Session 3 — Aug 3 (563b7c86)

39. These are the images that I have for 3 event pages — these don't have any background, only the characters are there. Add these photos to individual event pages as mentioned in the name of the image (I have named them according to the event). Have the 3-second effect for these images as well. Also place the pics according to the current page components — correctly like left bottom, right bottom, etc.

40. Start the server.

41. I can't see these new images in the UI.

42. Stop server for now.

43. Revert the photos part that we added to events.

44. Start the server.

45. Replace `public/images/WeddingBackground.png` with `public/images/StartingpageBackground.jpeg`.

46. `public/images/ModifiedWeedingPageDesign.png` — this is the updated design for the wedding page in which I have increased the font and a bit modification as well. Update the wedding page according to this new design. Also for the other pages as well, modify the font and spacing similar to this only.

47. Is the server started?

48. There are a few updates — plan them as well:
    - For the heading of the event pages make the font a bit bold and good.
    - For the other details increase the size of the font for all text content.

49. This font style is correct — plan the change to update all text which has a cursive text style in the complete project, update that to this font style and size as well, according to what we updated.

50. Perfect. Now update the logo image after the curtains — the logo image should be moved a bit above and the size of the image should be decreased by 10% so that it looks more perfect. Then one more fix: for the Haldi Carnival event heading "Haldi Carnival", the 'l' character is getting cropped in phone view — you can decrease the size of this heading but no more than 5% decrease.

51. For the image in this page make it a horizontal self-sliding gallery that keeps on changing every 2 seconds. For the photos consider: `public/images/couple.jpg`, `4.jpg`, `3.jpg`, `2.jpg`, `1.jpg` — these 5 images.

52. I forgot to add this page screenshot — now process.

53. For the logo image in the first page decrease the size a bit more — 10% decrease. Also fix the "Haldi Carnival" — the last character is getting cut.

54. Can you tell me how I can place all these photos to a platform and the images can be taken from there instead of having them locally. I have the subscription of iCloud — is it possible to use that only?

---

## Session 4 — Aug 4 (8b270a0e)

55. Is there any way where I can upload all these images and the link for those images can be used in this project so that I don't have to use these local images in the git repo? I have the subscription of iCloud — if possible can we use that?

56. I have uploaded these to Vercel Blob Storage.

57. For 1.jpg: (Vercel Blob URL provided) — but for now these images we have as current approach only. For new upcoming features we'll see if required, will use Vercel Blob.

58. Run the server.

59. Plan to add one more page after the events in which we have to create a collage from photos that needs to be fetched from a Vercel Blob Storage folder. If I add any photo in the folder, all the photos should be fetched again and the result should be reflected in the collage. The sample for that collage page I have attached and the background colour theme should be the same as current only.

60. Here is the `BLOB_READ_WRITE_TOKEN` — also attached the photo of the blob storage and folder.

61. Is this change responsive for all UI layouts?

62. Getting this error on Vercel deployment — `[NoAdapterInstalled] Cannot use server-rendered pages without an adapter...`

---

## Session 5 — Aug 28–31 (17d4f73d)

63. `public/images/NewStartPage.png`, `NewStartPage3.png`, `NewstartPage2.png` — this is the new opening animation for the wedding that I am thinking to update. Plan this change.

64. `public/images/StartPAgeBackground.png` — this is the background for the starting entry animation. In this animation it should be like: first the ribbon will open, then this gate will open, then the invitation starts. The colour code and figma — make it the same as the figma that we have currently.

65. Ready to build — start.

66. Make it a proper ribbon — this is not a ribbon animation.

67. Run this branch.

68. Stop.

69. I have reverted the new changes regarding ribbon and all. I have switched back to old version.

70. Let's add one more page in this wedding invitation — `public/images/NewPageInvtive.png` like this, in which the bride and groom names and details should be taken from `RequiredDetails.txt`. This page is after the countdown page. Also add some images in the other event pages:
    - `public/images/WeddingBottom.png`
    - `public/images/SangeetTopLeftAndRightCorner.png`
    - `public/images/SangeetBottomImage.png`
    - `public/images/NewPageInviteBottom.png`
    - `public/images/MahendiBottomImage.png`
    - `public/images/HaldiCarnivalBottomImage.png`

71. We have removed the ribbon part — still there is an error coming. Fix this and remove the ribbon part.

72. In the NewPageInvitation change the font of Bride and Groom names and the E and A — replace it with the logo itself `public/images/LOGO.png`.

73. The background images that we added for all the events are background-less so they should look like that only, but currently it is not looking nice — these are looking like a block, a rectangular image. It should look like a sticker.

74. `public/images/HaldiCarnivalBottom.png` — use this image in the Haldi Carnival event.

75. This is correct but the image is not coming for the complete screen size — it should fit the screen width.

76. For other event pages did you fix that?

77. One more modification: the bottom images are overlapping the text that is there like event details or the calendar button, the location button — fix that. Make the UI responsive so that for all devices it should work fine.

78. Update the "Add to Calendar" and "Location" button design on the events like the reference image (single pill with divider).

79. Also add a music pause button in the right corner so the user can pause the music. Make it a bit transparent so the UI should not get affected and the pause icon/button is also available to the user.

80. Restart the project.

81. `public/images/HaldiTopAndLeftRight.png`, `public/images/MahendiTop.png`, `public/images/WeddingTopRightLeft.png` — add these images also and add the effects also. Make sure the event details and these are not mixing into each other — manage the UI.

82. Restart the server.

83. In the last thank you section keep the text in the center and add a Thank You note text from the family as well.

84. For this project, collate all the prompts that I have given to customise this website and create a readme file `context.md` in chronological order (earlier at top, latest at bottom).

---

*Last updated: Aug 31, 2026*
