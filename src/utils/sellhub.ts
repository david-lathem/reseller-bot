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

    let apiResponse!: orderCreateResponse;

    if (
      body.type === SELLHUB_TYPES_CONST.PREMIUM_MEMBERS ||
      body.type === SELLHUB_TYPES_CONST.OFFLINE_MEMBERS
    )
      apiResponse = await createOAuthOrder({
        service: body.type,
        id: body.customFields[0].value,
        amount: 100,
      });

    if (body.type === SELLHUB_TYPES_CONST.ONE_MONTH_BOOST) {
      apiResponse = await createBoostOrder(
        BOOST_DURATION.ONE_MONTH,
        100,
        body.customFields[0].value
      );
    }

    if (body.type === SELLHUB_TYPES_CONST.THREE_MONTH_BOOST) {
      apiResponse = await createBoostOrder(
        BOOST_DURATION.THREE_MONTH,
        100,
        body.customFields[0].value
      );
    }

    res.send(
      `Please invite the bot here for it to work: ${apiResponse.bot_invite}`
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
