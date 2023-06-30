import React from "react";
import { surprimseMePrompts } from "../constants";
import FileSaver from "file-saver";
export function getRandomPrompt(prompt) {
  const randomInd = Math.floor(Math.random() * surprimseMePrompts.length);
  const randomPrompt = surprimseMePrompts[randomInd];

  if (randomPrompt === prompt) {
    return getRandomPrompt(prompt);
  }

  return randomPrompt;
}

export async function downloadImage(_id, pic) {
  FileSaver.saveAs(pic, `download-${_id}.jpg`);
}
