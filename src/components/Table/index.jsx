import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tooltip,
  Tfoot,
  Box,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { column } from "../../constants";

const TableComponent = ({
  data,
  handlepageChange,
  selectedColumns,
  nextPageDisabled,
  prevPageDisabled,
}) => {
  return (
    <Box>
      <TableContainer w="full">
        <Table variant="simple" w="full">
          <Thead>
            <Tr>
              {Object.keys(column).map(
                (item) => selectedColumns.has(item) && <Th>{column[item]}</Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr w="100%" key={item.video_id}>
                {Object.entries(column).map(
                  ([key, value]) =>
                    selectedColumns.has(key) && (
                      <Td key={key}>
                        {key === "title" ? (
                          <Tooltip label={item[key]}>
                            <Text maxWidth="100px" isTruncated>
                              {item[key] ?? "N/A"}
                            </Text>
                          </Tooltip>
                        ) : (
                          <Text maxWidth="100px" isTruncated>
                            {item[key] ?? "N/A"}
                          </Text>
                        )}
                      </Td>
                    )
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex w="100%" mt="2">
        <Box p="4">
          <Button
            isDisabled={prevPageDisabled}
            cursor="pointer"
            alignItems={"center"}
            onClick={() => handlepageChange(-1)}
          >
            <ArrowBackIcon cursor="pointer" />
            <Text ml="5px">Previous</Text>
          </Button>
        </Box>
        <Spacer />
        <Box p="4">
          <Button
            cursor="pointer"
            alignItems={"center"}
            onClick={() => handlepageChange(1)}
            isDisabled={nextPageDisabled}
          >
            <Text mr="5px">Next</Text>
            <ArrowForwardIcon onClick={() => handlepageChange(1)} />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default TableComponent;
