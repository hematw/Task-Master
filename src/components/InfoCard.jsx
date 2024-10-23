import { Card, CardHeader, CardBody } from "@nextui-org/react";
import React from "react";

function InfoCard({ title, description }) {
  return (
    <Card className="border border-black max-w-md p-4">
      <CardHeader>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </CardHeader>
      <CardBody>
        <p>{description}</p>
      </CardBody>
    </Card>
  );
}

export default InfoCard;
