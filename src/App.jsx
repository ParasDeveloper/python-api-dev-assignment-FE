import { useEffect, useState } from "react";
import "./App.css";
import TableComponent from "./components/Table";
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import Multiselect from "./components/Multiselect";
import { Input } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { API_STATUS, columnOptions } from "./constants";
import { getData } from "./services";
import { NO_DATA_TOAST, SERVER_ERROR_TOAST } from "./constants";
import _ from "lodash";

function App() {
  const [videosData, setVideosData] = useState([]);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(10);
  const [showLoading, setShowLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [columns, setColumns] = useState(
    new Set(columnOptions.map((item) => item.value))
  );
  const toast = useToast();
  const [prevPageDisabled, setPrevPageDisabled] = useState(true)
  const [nextPageDisabled, setNextPageDisabled] = useState(false)
  const [wasPreviousDataEmpty, setWasPreviousDataEmpty] = useState(false);
  console.log(nextPageDisabled)
  useEffect(() => {
    const debouncedSetData = _.debounce(() => {
      setData();
    }, 500);

    debouncedSetData();

    return () => {
      debouncedSetData.cancel(); 
    };
  }, [filters]);

  const setData = async () => {
    setShowLoading(true);
    let selectedColumns = "";
    if (!columns) {
      selectedColumns = columnOptions.map((item) => item.value).join(",");
    } else {
      selectedColumns = [...columns].join(",");
    }

    const resp = await getData(selectedColumns, page, filters, offset);
    if (resp.status !== API_STATUS.ERROR && !_.isEmpty(resp.data)) {
      if(!wasPreviousDataEmpty){
        setNextPageDisabled(false)
      }
      setWasPreviousDataEmpty(false)
      setVideosData(resp.data);
    } else {
      setVideosData([]);
      if (page !== 0) {
        if (_.isEmpty(resp.data)) {
          setNextPageDisabled(true)
          setWasPreviousDataEmpty(true)
          toast(NO_DATA_TOAST);
        } else {
          toast(SERVER_ERROR_TOAST);
        }
        setPage((prevPage) => prevPage - 1);
      } else {
        if (_.isEmpty(resp.data)) {
          setNextPageDisabled(true)
          setWasPreviousDataEmpty(true)
          toast(NO_DATA_TOAST);
        } else {
          toast(SERVER_ERROR_TOAST);
        }
      }
    }
    setShowLoading(false);
  };

  useEffect(() => {
    setData();
    page===0 ? setPrevPageDisabled(true) : setPrevPageDisabled(false)
  }, [page, offset, columns]);

  const onColumnChange = (e) => {
    let columns = e.map((item) => item.value);
    setColumns(new Set(columns));
  };

  const handlePageChange = (flag) => {
    if (flag === 1) {
      if(page+1 > 0){
        setPrevPageDisabled(false)
      }
      setPage((prevPage) => prevPage + 1);
    } else if (flag === -1 && page > 0) {
      if(page-1 == 0){
        setPrevPageDisabled(true);
      }
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Box p="10px">
      <Flex flexWrap="wrap" justifyContent="space-between">
        <Box mb="20px">
          <FormLabel htmlFor="video_id">Video Id</FormLabel>
          <Input
            id="video_id"
            mb="10px"
            ml="10px"
            placeholder="Video id"
            onChange={(e) =>
              setFilters((filters) => ({
                ...filters,
                video_id: e.target.value,
              }))
            }
          />
        </Box>

        <Box mb="20px">
          <FormLabel htmlFor="video_title">video title</FormLabel>
          <Input
            id="video_title"
            mb="10px"
            placeholder="video title"
            onChange={(e) =>
              setFilters((filters) => ({ ...filters, title: e.target.value }))
            }
          />
        </Box>

        <Box mb="20px">
          <FormLabel htmlFor="channel_title">channel title</FormLabel>
          <Input
            id="channel_title"
            mb="10px"
            placeholder="Channel title"
            onChange={(e) =>
              setFilters((filters) => ({
                ...filters,
                channel_title: e.target.value,
              }))
            }
          />
        </Box>
        <Box mb="20px">
          <FormLabel htmlFor="offset">Offset</FormLabel>
          <Select
            onChange={(e) => setOffset(e.target.value)}
            id="offset"
            defaultValue="10"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </Select>
        </Box>
      </Flex>
      <Multiselect
        handleColumnChange={onColumnChange}
        columnOptions={columnOptions}
      />
      {showLoading ? (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        <TableComponent
          prevPageDisabled={prevPageDisabled}
          nextPageDisabled={nextPageDisabled}
          data={videosData}
          handlepageChange={handlePageChange}
          selectedColumns={columns}
        />
      )}
    </Box>
  );
}

export default App;
