"use server";

import webpush from "web-push";

// Uncomment and configure your VAPID keys for production
// webpush.setVapidDetails(
//   "<mailto:mamlyhua@gmail.com>",
//   process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
//   process.env.VAPID_PRIVATE_KEY!
// );
webpush.setVapidDetails(
  "mailto:mamlyhua@gmail.com", // Corrected format
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscription: PushSubscription | null = null;

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true };
}

// Assuming the subscription comes from the browser's PushManager
export async function sendNotification(
  message: string,
  subNofi: PushSubscription
) {
  if (!subNofi) {
    throw new Error("No subscription available");
  }

  try {
    // Send the push notification using the formatted subscription object
    await webpush.sendNotification(
      subNofi as any, // Pass the custom web-push formatted subscription
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/apple-icon-180.png",
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
