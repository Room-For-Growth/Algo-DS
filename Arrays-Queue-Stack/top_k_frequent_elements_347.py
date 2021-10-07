# heap + sorting + hash table
# heappush(heap, ele): insert the element mentioned in its arguments into heap
# heappop(heap): remove and return the smallest element from heap
from heapq import *

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        # create frequency table
        numFrequency = {}
        for num in nums:
            numFrequency[num] = numFrequency.get(num, 0) + 1

        min_heap = []
        # iterate hash map, 将所有hash map 中的 pair存入min_heap 
        for num, frequency in numFrequency.items():
            heappush(min_heap, (frequency, num))
            # 保留K个最大的frequency pair
            if len(min_heap) > k:
                heappop(min_heap)

        # 将heap中 top k frequency element 导入output array
        top_k_fre_num = []
        while min_heap:
            top_k_fre_num.append(heappop(min_heap)[1])

        return top_k_fre_num
