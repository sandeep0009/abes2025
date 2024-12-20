def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True

def rearrange_array(arr):
    primes = [x for x in arr if is_prime(x)]
    non_primes = [x for x in arr if not is_prime(x)]
    
    if not primes:
        return sorted(arr, reverse=True)
    
    largest_prime = max(primes)
    smallest_prime = min(primes)
    
    non_primes.sort(reverse=True)
    
    result = [largest_prime] + non_primes + [smallest_prime]
    return result


example_1 = [5, 1, 8, 11, 2]
example_2 = [1, 6, 4, 13, 9, 3]

print(rearrange_array(example_1)) 
print(rearrange_array(example_2))  
