import { Request, Response } from "express";
import { SELLHUB_TYPES_CONST, SellHubOrder } from "./typings/SellHub.js";
import { BOOST_DURATION, SELLHUB_VARIANT_TYPE_MAP } from "./constants.js";
import { createBoostOrder, createOAuthOrder } from "./resellerAPI.js";
import { orderCreateResponse } from "./typings/types.js";
import { refundSellhubInvoice } from "./sellhubAPI.js";

export const handleSellHubOrder = async (
  req: Request<{}, {}, SellHubOrder>,
  res: Response
) => {
  const { body } = req;

  console.log(body);

  try {
    addType(body);

    let apiResponse: orderCreateResponse = {
      bot_invite:
        "https://dash.sellhub.cx/8e13168e-2d33-46be-aa9c-4faab7f331ae/store/notifications/",
      cost: 0,
      uniqid: "",
    }; // dummy placeholder

    const amountToMultiply = body.quantity;

    if (
      body.type === SELLHUB_TYPES_CONST.PREMIUM_MEMBERS ||
      body.type === SELLHUB_TYPES_CONST.OFFLINE_MEMBERS
    )
      apiResponse = await createOAuthOrder({
        service: body.type,
        id: body.customFields[0].value,
        amount: amountToMultiply * 20,
      });

    if (body.type === SELLHUB_TYPES_CONST.ONE_MONTH_BOOST) {
      apiResponse = await createBoostOrder(
        BOOST_DURATION.ONE_MONTH,
        amountToMultiply,
        body.customFields[0].value
      );
    }

    if (body.type === SELLHUB_TYPES_CONST.THREE_MONTH_BOOST) {
      apiResponse = await createBoostOrder(
        BOOST_DURATION.THREE_MONTH,
        amountToMultiply,
        body.customFields[0].value
      );
    }

    res.send(
      `Please invite our discord bot here for your order to be processed: ${apiResponse.bot_invite}`
    );
  } catch (error) {
    console.error(error);

    res.send(
      "Something bad happened. Please contact in our support server. We have refunded you the amount back!"
    );

    setTimeout(async () => {
      // after 30 sec, so it marks as complete in sellhub
      await refundSellhubInvoice(body.invoice.id).catch(console.error);
    }, 1000 * 30);
  }
};

function addType(data: SellHubOrder) {
  data.type = SELLHUB_VARIANT_TYPE_MAP[data.variant.id];
}
