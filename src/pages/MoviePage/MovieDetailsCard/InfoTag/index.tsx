import { FC } from "react";
import { Text } from "@chakra-ui/react";

interface InfoTagProps {
  name: string;
  value: string;
}

const InfoTag: FC<InfoTagProps> = ({ name, value }) => {
  return (
    <Text>
      <b>{name}:</b> {value}
    </Text>
  );
};

export default InfoTag;
